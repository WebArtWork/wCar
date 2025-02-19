import { Injectable } from '@angular/core';
import { Carplace } from '../interfaces/carplace.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CarplaceService extends CrudService<Carplace> {
	constructor() {
		super({
			name: 'carplace'
		});
	}
}
