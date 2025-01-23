import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import {
	CarService,
	Car,
} from 'src/app/core/services/car.service';
import { AlertService, CoreService } from 'wacom';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './mycars.component.html',
	styleUrls: ['./mycars.component.scss'],
	standalone: false,
})
export class MycarsComponent {
	columns = ['name', 'description'];

	rows: Car[] = [];

	form: FormInterface = this._form.getForm('mycars', {
		formId: 'mycars',
		title: 'Mycars',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill mycars title',
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
						value: 'fill mycars description',
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
			this._form.modal<Car>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void): void => {
					this._preCreate(created as Car);

					this._cs.create(created as Car, {
						alert: this._translate.translate(
							'Car.Car has been created'
						),
						callback: (): void => {
							this.setRows();

							close();
						},
					});
				},
			});
		},
		update: (doc: Car): void => {
			this._form
				.modal<Car>(this.form, [], doc)
				.then((updated: Car): void => {
					this._core.copy(updated, doc);

					this._cs.update(doc, {
						alert: this._translate.translate(
							'Car.Car has been updated'
						),
					});
				});
		},
		delete: (doc: Car): void => {
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
									'Car.Car has been deleted'
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
		private _cs: CarService,
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
				.modalDocs<Car>(create ? [] : this.rows)
				.then(async (cars: Car[]) => {
					if (create) {
						for (const car of cars) {
							this._preCreate(car);

							await firstValueFrom(
								this._cs.create(car)
							);
						}
					} else {
						for (const car of this.rows) {
							if (
								!cars.find(
									(localCar) =>
										localCar._id === car._id
								)
							) {
								await firstValueFrom(
									this._cs.delete(car)
								);
							}
						}

						for (const car of cars) {
							const localCar = this.rows.find(
								(localCar) =>
									localCar._id === car._id
							);

							if (localCar) {
								this._core.copy(car, localCar);

								await firstValueFrom(
									this._cs.update(localCar)
								);
							} else {
								this._preCreate(car);

								await firstValueFrom(
									this._cs.create(car)
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
