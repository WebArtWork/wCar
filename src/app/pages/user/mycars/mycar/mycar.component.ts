import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; // Імпортуємо Router
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { Car } from 'src/app/modules/car/interfaces/car.interface';
import { CarService } from 'src/app/modules/car/services/car.service';
import { AlertService, CoreService } from 'wacom';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { carFormComponents } from 'src/app/modules/car/formcomponents/car.formcomponents';

@Component({
	selector: 'app-mycar',
	standalone: false,
	templateUrl: './mycar.component.html',
	styleUrls: ['./mycar.component.scss']
})
export class MycarComponent {
	@Input() car!: Car;

	constructor(
		private _translate: TranslateService,
		private _carService: CarService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private router: Router // Додаємо Router в конструктор
	) {}

	form: FormInterface = this._form.getForm('car', carFormComponents);

	update(doc: Car): void {
		this._form.modal<Car>(this.form, [], doc).then((updated: Car) => {
			this._core.copy(updated, doc);
			this._carService.update(doc);
		});
	}

	delete(doc: Car): void {
		this._alert.question({
			text: this._translate.translate(
				'Common.Are you sure you want to delete this car?'
			),
			buttons: [
				{
					text: this._translate.translate('Common.No')
				},
				{
					text: this._translate.translate('Common.Yes'),
					callback: (): void => {
						this._carService.delete(doc);
					}
				}
			]
		});
	}

	// Метод для переходу на сторінку carhistory
	goToCarHistory(car: Car): void {
		this.router.navigate(['/carhistory', car._id]); // Переходимо на сторінку carhistory і передаємо car.id
	}
}
