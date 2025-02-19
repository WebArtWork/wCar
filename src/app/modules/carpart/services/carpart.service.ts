import { Injectable } from '@angular/core';
import { Carpart } from '../interfaces/carpart.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CarpartService extends CrudService<Carpart> {
	constructor() {
		super({
			name: 'carpart'
		});
	}
}
