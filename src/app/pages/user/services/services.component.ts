import { Component } from '@angular/core';
import {
	CarserviceService,
	Carservice,
} from 'src/app/core/services/carservice.service';
import { AlertService, CoreService } from 'wacom';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.scss'],
	standalone: false,
})
export class ServicesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('services', {
		formId: 'services',
		title: 'Services',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill services title',
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
						value: 'fill services description',
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
			this._form.modal<Carservice>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void): void => {
					this._preCreate(created as Carservice);

					this._cs.create(created as Carservice);

					close();
				},
			});
		},
		update: (doc: Carservice): void => {
			this._form
				.modal<Carservice>(this.form, [], doc)
				.then((updated: Carservice): void => {
					this._core.copy(updated, doc);

					this._cs.update(doc);
				});
		},
		delete: (doc: Carservice): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Carservice?'
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
				click: (doc: Carservice): void => {
					this._form.modalUnique<Carservice>('services', 'url', doc);
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

	get rows(): Carservice[] {
		return this._cs.carservices;
	}

	constructor(
		private _cs: CarserviceService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Carservice>(create ? [] : this.rows)
				.then((carservices: Carservice[]) => {
					if (create) {
						for (const carservice of carservices) {
							this._preCreate(carservice);

							this._cs.create(carservice);
						}
					} else {
						for (const carservice of this.rows) {
							if (
								!carservices.find(
									(localCarservice) =>
										localCarservice._id === carservice._id
								)
							) {
								this._cs.delete(carservice);
							}
						}

						for (const carservice of carservices) {
							const localCarservice = this.rows.find(
								(localCarservice) =>
									localCarservice._id === carservice._id
							);

							if (localCarservice) {
								this._core.copy(carservice, localCarservice);

								this._cs.update(localCarservice);
							} else {
								this._preCreate(carservice);

								this._cs.create(carservice);
							}
						}
					}
				});
		};
	}

	private _preCreate(carservice: Carservice): void {
		delete carservice.__created;
	}
}
