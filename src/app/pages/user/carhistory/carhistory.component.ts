import { Component } from '@angular/core';
import {
	CarrecordService,
	Carrecord,
} from 'src/app/core/services/carrecord.service';
import { AlertService, CoreService } from 'wacom';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './carhistory.component.html',
	styleUrls: ['./carhistory.component.scss'],
	standalone: false,
})
export class CarhistoryComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('carhistory', {
		formId: 'carhistory',
		title: 'Carhistory',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill carhistory title',
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
						value: 'fill carhistory description',
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
		create: (): void => {
			this._form.modal<Carrecord>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void): void => {
					this._preCreate(created as Carrecord);

					this._cs.create(created as Carrecord);

					close();
				},
			});
		},
		update: (doc: Carrecord): void => {
			this._form
				.modal<Carrecord>(this.form, [], doc)
				.then((updated: Carrecord): void => {
					this._core.copy(updated, doc);

					this._cs.update(doc);
				});
		},
		delete: (doc: Carrecord): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Carrecord?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._cs.delete(doc);
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Carrecord): void => {
					this._form.modalUnique<Carrecord>('carhistory', 'url', doc);
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

	get rows(): Carrecord[] {
		return this._cs.carrecords;
	}

	constructor(
		private _cs: CarrecordService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Carrecord>(create ? [] : this.rows)
				.then((carrecords: Carrecord[]) => {
					if (create) {
						for (const carrecord of carrecords) {
							this._preCreate(carrecord);

							this._cs.create(carrecord);
						}
					} else {
						for (const carrecord of this.rows) {
							if (
								!carrecords.find(
									(localCarrecord) =>
										localCarrecord._id === carrecord._id
								)
							) {
								this._cs.delete(carrecord);
							}
						}

						for (const carrecord of carrecords) {
							const localCarrecord = this.rows.find(
								(localCarrecord) =>
									localCarrecord._id === carrecord._id
							);

							if (localCarrecord) {
								this._core.copy(carrecord, localCarrecord);

								this._cs.update(localCarrecord);
							} else {
								this._preCreate(carrecord);

								this._cs.create(carrecord);
							}
						}
					}
				});
		};
	}

	private _preCreate(carrecord: Carrecord): void {
		delete carrecord.__created;
	}
}
