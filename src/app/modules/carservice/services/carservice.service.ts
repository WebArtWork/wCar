import { Injectable } from '@angular/core';
import { Carservice } from '../interfaces/carservice.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CarserviceService extends CrudService<Carservice> {
	constructor() {
		super({
			name: 'carservice'
		});
	}
}
