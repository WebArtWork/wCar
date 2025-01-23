import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import {
	CartradeService,
	Cartrade,
} from 'src/app/core/services/cartrade.service';
import { AlertService, CoreService } from 'wacom';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './marketcars.component.html',
	styleUrls: ['./marketcars.component.scss'],
	standalone: false,
})
export class MarketcarsComponent {
	columns = ['name', 'description'];

	rows: Cartrade[] = [];

	form: FormInterface = this._form.getForm('marketcars', {
		formId: 'marketcars',
		title: 'Marketcars',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill marketcars title',
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
						value: 'fill marketcars description',
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
			this._form.modal<Cartrade>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void): void => {
					this._preCreate(created as Cartrade);

					this._cs.create(created as Cartrade, {
						alert: this._translate.translate(
							'Cartrade.Cartrade has been created'
						),
						callback: (): void => {
							this.setRows();

							close();
						},
					});
				},
			});
		},
		update: (doc: Cartrade): void => {
			this._form
				.modal<Cartrade>(this.form, [], doc)
				.then((updated: Cartrade): void => {
					this._core.copy(updated, doc);

					this._cs.update(doc, {
						alert: this._translate.translate(
							'Cartrade.Cartrade has been updated'
						),
					});
				});
		},
		delete: (doc: Cartrade): void => {
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
									'Cartrade.Cartrade has been deleted'
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
		private _cs: CartradeService,
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
				.modalDocs<Cartrade>(create ? [] : this.rows)
				.then(async (cartrades: Cartrade[]) => {
					if (create) {
						for (const cartrade of cartrades) {
							this._preCreate(cartrade);

							await firstValueFrom(
								this._cs.create(cartrade)
							);
						}
					} else {
						for (const cartrade of this.rows) {
							if (
								!cartrades.find(
									(localCartrade) =>
										localCartrade._id === cartrade._id
								)
							) {
								await firstValueFrom(
									this._cs.delete(cartrade)
								);
							}
						}

						for (const cartrade of cartrades) {
							const localCartrade = this.rows.find(
								(localCartrade) =>
									localCartrade._id === cartrade._id
							);

							if (localCartrade) {
								this._core.copy(cartrade, localCartrade);

								await firstValueFrom(
									this._cs.update(localCartrade)
								);
							} else {
								this._preCreate(cartrade);

								await firstValueFrom(
									this._cs.create(cartrade)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(cartrade: Cartrade): void {
		delete cartrade.__created;
	}
}
