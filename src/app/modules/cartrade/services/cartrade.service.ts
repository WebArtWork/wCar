import { Injectable } from '@angular/core';
import { Cartrade } from '../interfaces/cartrade.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class CartradeService extends CrudService<Cartrade> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'cartrade',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
