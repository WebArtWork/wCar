import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CarpartService } from '../../services/carpart.service';
import { Carpart } from '../../interfaces/carpart.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { carpartFormComponents } from '../../formcomponents/carpart.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './carpart.component.html',
	styleUrls: ['./carpart.component.scss'],
	standalone: false,
})
export class CarpartComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('carpart', carpartFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._carpartService.setPerPage.bind(this._carpartService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Carpart>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Carpart);

					await firstValueFrom(
						this._carpartService.create(created as Carpart)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Carpart): void => {
			this._form
				.modal<Carpart>(this.form, [], doc)
				.then((updated: Carpart) => {
					this._core.copy(updated, doc);

					this._carpartService.update(doc);
				});
		},
		delete: (doc: Carpart): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this carpart?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._carpartService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Carpart): void => {
					this._form.modalUnique<Carpart>('carpart', 'url', doc);
				},
			},
		],
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

	rows: Carpart[] = [];

	constructor(
		private _translate: TranslateService,
		private _carpartService: CarpartService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._carpartService.get({ page }).subscribe((rows) => {
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
								this._carpartService.create(carpart)
							);
						}
					} else {
						for (const carpart of this.rows) {
							if (
								!carparts.find(
									(localCarpart) => localCarpart._id === carpart._id
								)
							) {
								await firstValueFrom(
									this._carpartService.delete(carpart)
								);
							}
						}

						for (const carpart of carparts) {
							const localCarpart = this.rows.find(
								(localCarpart) => localCarpart._id === carpart._id
							);

							if (localCarpart) {
								this._core.copy(carpart, localCarpart);

								await firstValueFrom(
									this._carpartService.update(localCarpart)
								);
							} else {
								this._preCreate(carpart);

								await firstValueFrom(
									this._carpartService.create(carpart)
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
