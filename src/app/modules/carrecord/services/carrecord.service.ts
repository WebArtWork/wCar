import { Injectable } from '@angular/core';
import { Carrecord } from '../interfaces/carrecord.interface';
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
export class CarrecordService extends CrudService<Carrecord> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'carrecord',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
