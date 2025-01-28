import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CarrecordService } from '../../services/carrecord.service';
import { Carrecord } from '../../interfaces/carrecord.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { carrecordFormComponents } from '../../formcomponents/carrecord.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';

@Component({
	templateUrl: './carrecord.component.html',
	styleUrls: ['./carrecord.component.scss'],
	standalone: false,
})
export class CarrecordComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('carrecord', carrecordFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._carrecordService.setPerPage.bind(this._carrecordService),
		allDocs: false,
		create: this._router.url.includes('carrecord/') ?  (): void => {
			this._form.modal<Carrecord>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Carrecord);

					await firstValueFrom(
						this._carrecordService.create(created as Carrecord)
					);

					this.setRows();
				},
			});
		} : null,
		update: (doc: Carrecord): void => {
			this._form
				.modal<Carrecord>(this.form, [], doc)
				.then((updated: Carrecord) => {
					this._core.copy(updated, doc);

					this._carrecordService.update(doc);
				});
		},
		delete: (doc: Carrecord): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this carrecord?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._carrecordService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Carrecord): void => {
					this._form.modalUnique<Carrecord>('carrecord', 'url', doc);
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

	rows: Carrecord[] = [];

	car_id = '';

	constructor(
		private _translate: TranslateService,
		private _carrecordService: CarrecordService,
		private _alert: AlertService,
		private _route: ActivatedRoute,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router

	) {
		this.setRows();
		this._route.paramMap.subscribe(params => {
			this.car_id = params.get('car_id') || '';

			console.log(this.car_id)
		})
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._carrecordService
				.get({ page, query: this._query() })
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
				.modalDocs<Carrecord>(create ? [] : this.rows)
				.then(async (carrecords: Carrecord[]) => {
					if (create) {
						for (const carrecord of carrecords) {
							this._preCreate(carrecord);

							await firstValueFrom(
								this._carrecordService.create(carrecord)
							);
						}
					} else {
						for (const carrecord of this.rows) {
							if (
								!carrecords.find(
									(localCarrecord) => localCarrecord._id === carrecord._id
								)
							) {
								await firstValueFrom(
									this._carrecordService.delete(carrecord)
								);
							}
						}

						for (const carrecord of carrecords) {
							const localCarrecord = this.rows.find(
								(localCarrecord) => localCarrecord._id === carrecord._id
							);

							if (localCarrecord) {
								this._core.copy(carrecord, localCarrecord);

								await firstValueFrom(
									this._carrecordService.update(localCarrecord)
								);
							} else {
								this._preCreate(carrecord);

								await firstValueFrom(
									this._carrecordService.create(carrecord)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(carrecord: Carrecord): void {
		carrecord.__created = false;

		if (this.car_id){
			carrecord.car = this.car_id;
		}
	}

	private _query(): string {
		let query = '';

		if (this.car_id) {
			query += (query ? '&' : '') + 'car=' + this.car_id;
		}

		return query;
	}
}
