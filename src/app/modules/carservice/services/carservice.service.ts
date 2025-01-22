import { Injectable } from '@angular/core';
import { Carservice } from '../interfaces/carservice.interface';
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
export class CarserviceService extends CrudService<Carservice> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'carservice',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
