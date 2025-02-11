import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/modules/car/services/car.service';


@Component({
	templateUrl: './carprofile.component.html',
	styleUrls: ['./carprofile.component.scss'],
	standalone: false
})
export class CarprofileComponent {
	carprofile = this._carService.doc(
		this._router.url.replace('/carprofile/', '')
	);

	constructor(
		private _carService: CarService,
		private _router: Router,

	) { }
}
