import { Component } from '@angular/core';
import { Car } from 'src/app/modules/car/interfaces/car.interface';
import { CarService } from 'src/app/modules/car/services/car.service';

@Component({
	templateUrl: './mycars.component.html',
	styleUrls: ['./mycars.component.scss'],
	standalone: false
})
export class MycarsComponent {
	get mycars(): Car[] {
		return this._carService.cars
	}

	isMenuOpen = false;

	constructor(private _carService: CarService) {}
}
