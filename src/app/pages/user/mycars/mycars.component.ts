import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { Car } from 'src/app/modules/car/interfaces/car.interface';
import { CarService } from 'src/app/modules/car/services/car.service';
import { carFormComponents } from 'src/app/modules/car/formcomponents/car.formcomponents';

@Component({
	templateUrl: './mycars.component.html',
	styleUrls: ['./mycars.component.scss'],
	standalone: false
})
export class MycarsComponent {
	// Ініціалізація форми
	form = this._form.getForm('car', carFormComponents);

	get mycars(): Car[] {
		return this._carService.cars;
	}

	isMenuOpen = false;

	constructor(
		private _carService: CarService,
		private _form: FormService,
		private _router: Router
	) {}

	create(): void {
		this._form.modal<Car>(this.form, {
			label: 'Create',
			click: (created: unknown, close: () => void) => {
				this._carService.create(created as Car).subscribe(() => {
					close();
					this._router.navigate(['/mycars']); // Приклад перенаправлення після створення
				});
			},
		});
	}
}
