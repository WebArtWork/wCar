import { Injectable } from '@angular/core';
import { Carpart } from '../interfaces/carpart.interface';
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
export class CarpartService extends CrudService<Carpart> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'carpart',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
