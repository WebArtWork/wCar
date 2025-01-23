import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CarplaceService } from '../../services/carplace.service';
import { Carplace } from '../../interfaces/carplace.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { carplaceFormComponents } from '../../formcomponents/carplace.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './carplace.component.html',
	styleUrls: ['./carplace.component.scss'],
	standalone: false,
})
export class CarplaceComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('carplace', carplaceFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._carplaceService.setPerPage.bind(this._carplaceService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Carplace>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Carplace);

					await firstValueFrom(
						this._carplaceService.create(created as Carplace)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Carplace): void => {
			this._form
				.modal<Carplace>(this.form, [], doc)
				.then((updated: Carplace) => {
					this._core.copy(updated, doc);

					this._carplaceService.update(doc);
				});
		},
		delete: (doc: Carplace): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this carplace?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._carplaceService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Carplace): void => {
					this._form.modalUnique<Carplace>('carplace', 'url', doc);
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

	rows: Carplace[] = [];

	constructor(
		private _translate: TranslateService,
		private _carplaceService: CarplaceService,
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
				this._carplaceService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Carplace>(create ? [] : this.rows)
				.then(async (carplaces: Carplace[]) => {
					if (create) {
						for (const carplace of carplaces) {
							this._preCreate(carplace);

							await firstValueFrom(
								this._carplaceService.create(carplace)
							);
						}
					} else {
						for (const carplace of this.rows) {
							if (
								!carplaces.find(
									(localCarplace) => localCarplace._id === carplace._id
								)
							) {
								await firstValueFrom(
									this._carplaceService.delete(carplace)
								);
							}
						}

						for (const carplace of carplaces) {
							const localCarplace = this.rows.find(
								(localCarplace) => localCarplace._id === carplace._id
							);

							if (localCarplace) {
								this._core.copy(carplace, localCarplace);

								await firstValueFrom(
									this._carplaceService.update(localCarplace)
								);
							} else {
								this._preCreate(carplace);

								await firstValueFrom(
									this._carplaceService.create(carplace)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(carplace: Carplace): void {
		delete carplace.__created;
	}
}
