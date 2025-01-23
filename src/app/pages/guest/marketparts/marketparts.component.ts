import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import {
	CarpartService,
	Carpart,
} from 'src/app/core/services/carpart.service';
import { AlertService, CoreService } from 'wacom';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './marketparts.component.html',
	styleUrls: ['./marketparts.component.scss'],
	standalone: false,
})
export class MarketpartsComponent {
	columns = ['name', 'description'];

	rows: Carpart[] = [];

	form: FormInterface = this._form.getForm('marketparts', {
		formId: 'marketparts',
		title: 'Marketparts',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill marketparts title',
					},
					{
						name: 'Label',
						value: 'Title',
					},
				],
			},
			{
				name: 'Text',
				key: 'description',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill marketparts description',
					},
					{
						name: 'Label',
						value: 'Description',
					},
				],
			},
		],
	});

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._cs.setPerPage.bind(this._cs),
		allDocs: false,
		create: (): void => {
			this._form.modal<Carpart>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void): void => {
					this._preCreate(created as Carpart);

					this._cs.create(created as Carpart, {
						alert: this._translate.translate(
							'Carpart.Carpart has been created'
						),
						callback: (): void => {
							this.setRows();

							close();
						},
					});
				},
			});
		},
		update: (doc: Carpart): void => {
			this._form
				.modal<Carpart>(this.form, [], doc)
				.then((updated: Carpart): void => {
					this._core.copy(updated, doc);

					this._cs.update(doc, {
						alert: this._translate.translate(
							'Carpart.Carpart has been updated'
						),
					});
				});
		},
		delete: (doc: Carpart): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this cservice?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._cs.delete(doc, {
								alert: this._translate.translate(
									'Carpart.Carpart has been deleted'
								),
								callback: (): void => {
									this.setRows();
								},
							});
						},
					},
				],
			});
		},
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		],
	};

	constructor(
		private _translate: TranslateService,
		private _alert: AlertService,
		private _cs: CarpartService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			(): void => {
				this._cs.get({ page }).subscribe((rows): void => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Carpart>(create ? [] : this.rows)
				.then(async (carparts: Carpart[]) => {
					if (create) {
						for (const carpart of carparts) {
							this._preCreate(carpart);

							await firstValueFrom(
								this._cs.create(carpart)
							);
						}
					} else {
						for (const carpart of this.rows) {
							if (
								!carparts.find(
									(localCarpart) =>
										localCarpart._id === carpart._id
								)
							) {
								await firstValueFrom(
									this._cs.delete(carpart)
								);
							}
						}

						for (const carpart of carparts) {
							const localCarpart = this.rows.find(
								(localCarpart) =>
									localCarpart._id === carpart._id
							);

							if (localCarpart) {
								this._core.copy(carpart, localCarpart);

								await firstValueFrom(
									this._cs.update(localCarpart)
								);
							} else {
								this._preCreate(carpart);

								await firstValueFrom(
									this._cs.create(carpart)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(carpart: Carpart): void {
		delete carpart.__created;
	}
}
