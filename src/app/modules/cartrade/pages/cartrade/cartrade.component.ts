import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CartradeService } from '../../services/cartrade.service';
import { Cartrade } from '../../interfaces/cartrade.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { cartradeFormComponents } from '../../formcomponents/cartrade.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './cartrade.component.html',
	styleUrls: ['./cartrade.component.scss'],
	standalone: false,
})
export class CartradeComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('cartrade', cartradeFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._cartradeService.setPerPage.bind(this._cartradeService),
		allDocs: false,
		create: this._router.url.includes('cartrade/')
			? (): void => {
				this._form.modal<Cartrade>(this.form, {
					label: 'Create',
					click: async (created: unknown, close: () => void) => {
						close();
						this._preCreate(created as Cartrade);
						await firstValueFrom(this._cartradeService.create(created as Cartrade));
						this.setRows();
					},
				});
			}
		: null,
		update: (doc: Cartrade): void => {
			this._form.modal<Cartrade>(this.form, [], doc).then((updated: Cartrade) => {
				this._core.copy(updated, doc);
				this._cartradeService.update(doc);
			});
		},
		delete: (doc: Cartrade): void => {
			this._alert.question({
				text: this._translate.translate('Common.Are you sure you want to delete this cartrade?'),
				buttons: [
					{ text: this._translate.translate('Common.No') },
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._cartradeService.delete(doc));
							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Cartrade): void => {
					this._form.modalUnique<Cartrade>('cartrade', 'url', doc);
				},
			},
		],
		headerButtons: [
			{ icon: 'playlist_add', click: this._bulkManagement(), class: 'playlist' },
			{ icon: 'edit_note', click: this._bulkManagement(false), class: 'edit' },
		],
	};

	rows: Cartrade[] = [];
	car_id = '';

	constructor(
		private _translate: TranslateService,
		private _cartradeService: CartradeService,
		private _alert: AlertService,
		private _route: ActivatedRoute,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setRows();
		this._route.paramMap.subscribe(params => {
			this.car_id = params.get('car_id') || '';
		});
	}

	setRows(page = this._page): void {
		this._page = page;
		this._core.afterWhile(
			this,
			() => {
				this._cartradeService.get({ page, query: this._query() }).subscribe((rows) => {
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
			this._form.modalDocs<Cartrade>(create ? [] : this.rows).then(async (cartrades: Cartrade[]) => {
				if (create) {
					for (const cartrade of cartrades) {
						this._preCreate(cartrade);
						await firstValueFrom(this._cartradeService.create(cartrade));
					}
				} else {
					for (const cartrade of this.rows) {
						if (!cartrades.find((localCartrade) => localCartrade._id === cartrade._id)) {
							await firstValueFrom(this._cartradeService.delete(cartrade));
						}
					}

					for (const cartrade of cartrades) {
						const localCartrade = this.rows.find((localCartrade) => localCartrade._id === cartrade._id);

						if (localCartrade) {
							this._core.copy(cartrade, localCartrade);
							await firstValueFrom(this._cartradeService.update(localCartrade));
						} else {
							this._preCreate(cartrade);
							await firstValueFrom(this._cartradeService.create(cartrade));
						}
					}
				}

				this.setRows();
			});
		};
	}

	private _preCreate(cartrade: Cartrade): void {
		cartrade.__created = false;
		if (this.car_id) {
			cartrade.car = this.car_id;
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
