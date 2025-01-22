import { Injectable } from '@angular/core';
import { Car } from '../interfaces/car.interface';
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
export class CarService extends CrudService<Car> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'car',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
