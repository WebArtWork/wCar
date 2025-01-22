import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CarService } from '../../services/car.service';
import { Car } from '../../interfaces/car.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { carFormComponents } from '../../formcomponents/car.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './car.component.html',
	styleUrls: ['./car.component.scss'],
	standalone: false,
})
export class CarComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('car', carFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._carService.setPerPage.bind(this._carService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Car>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Car);

					await firstValueFrom(
						this._carService.create(created as Car)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Car): void => {
			this._form
				.modal<Car>(this.form, [], doc)
				.then((updated: Car) => {
					this._core.copy(updated, doc);

					this._carService.update(doc);
				});
		},
		delete: (doc: Car): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this car?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._carService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Car): void => {
					this._form.modalUnique<Car>('car', 'url', doc);
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

	rows: Car[] = [];

	constructor(
		private _translate: TranslateService,
		private _carService: CarService,
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
				this._carService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Car>(create ? [] : this.rows)
				.then(async (cars: Car[]) => {
					if (create) {
						for (const car of cars) {
							this._preCreate(car);

							await firstValueFrom(
								this._carService.create(car)
							);
						}
					} else {
						for (const car of this.rows) {
							if (
								!cars.find(
									(localCar) => localCar._id === car._id
								)
							) {
								await firstValueFrom(
									this._carService.delete(car)
								);
							}
						}

						for (const car of cars) {
							const localCar = this.rows.find(
								(localCar) => localCar._id === car._id
							);

							if (localCar) {
								this._core.copy(car, localCar);

								await firstValueFrom(
									this._carService.update(localCar)
								);
							} else {
								this._preCreate(car);

								await firstValueFrom(
									this._carService.create(car)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(car: Car): void {
		delete car.__created;
	}
}
