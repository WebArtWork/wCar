import { Injectable } from '@angular/core';
import { Cartrade } from '../interfaces/cartrade.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CartradeService extends CrudService<Cartrade> {
	constructor() {
		super({
			name: 'cartrade'
		});
	}
}
