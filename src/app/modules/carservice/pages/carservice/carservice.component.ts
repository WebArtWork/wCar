import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CarserviceService } from '../../services/carservice.service';
import { Carservice } from '../../interfaces/carservice.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { carserviceFormComponents } from '../../formcomponents/carservice.formcomponents';
import { firstValueFrom } from 'rxjs';
import { Carplace } from 'src/app/modules/carplace/interfaces/carplace.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './carservice.component.html',
	styleUrls: ['./carservice.component.scss'],
	standalone: false
})
export class CarserviceComponent {
	car_id = this._router.url.includes('carservice/')
		? this._router.url.replace('/carservice/', '')
		: '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'carservice',
		carserviceFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._carserviceService.setPerPage.bind(
			this._carserviceService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Carservice>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Carservice);

					await firstValueFrom(
						this._carserviceService.create(created as Carservice)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Carservice): void => {
			this._form
				.modal<Carservice>(this.form, [], doc)
				.then((updated: Carservice) => {
					this._core.copy(updated, doc);

					this._carserviceService.update(doc);
				});
		},
		delete: (doc: Carservice): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this carservice?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._carserviceService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'more_vert',
				hrefFunc: (doc: Carplace): string => {
					return '/carplace/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Carservice): void => {
					this._form.modalUnique<Carservice>(
						'carservice',
						'url',
						doc
					);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist'
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	rows: Carservice[] = [];

	constructor(
		private _translate: TranslateService,
		private _carserviceService: CarserviceService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._carserviceService
				.get({
					page,
					query: this.car_id
						? 'car=' + this.car_id
						: ''
				})
				.subscribe((rows) => {
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
				.modalDocs<Carservice>(create ? [] : this.rows)
				.then(async (carservices: Carservice[]) => {
					if (create) {
						for (const carservice of carservices) {
							this._preCreate(carservice);

							await firstValueFrom(
								this._carserviceService.create(carservice)
							);
						}
					} else {
						for (const carservice of this.rows) {
							if (
								!carservices.find(
									(localCarservice) =>
										localCarservice._id === carservice._id
								)
							) {
								await firstValueFrom(
									this._carserviceService.delete(carservice)
								);
							}
						}

						for (const carservice of carservices) {
							const localCarservice = this.rows.find(
								(localCarservice) =>
									localCarservice._id === carservice._id
							);

							if (localCarservice) {
								this._core.copy(carservice, localCarservice);

								await firstValueFrom(
									this._carserviceService.update(
										localCarservice
									)
								);
							} else {
								this._preCreate(carservice);

								await firstValueFrom(
									this._carserviceService.create(carservice)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(carservice: Carservice): void {
		carservice.__created;

		if (this.car_id){
			carservice.car = this.car_id;
		}
	}
}
