import { Injectable } from '@angular/core';
import { Carrecord } from '../interfaces/carrecord.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CarrecordService extends CrudService<Carrecord> {
	constructor() {
		super({
			name: 'carrecord'
		});
	}
}
