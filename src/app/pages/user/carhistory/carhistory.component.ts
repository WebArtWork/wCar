import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { CarrecordService } from 'src/app/modules/carrecord/services/carrecord.service';
import { Carrecord } from 'src/app/modules/carrecord/interfaces/carrecord.interface';
import { carrecordFormComponents } from 'src/app/modules/carrecord/formcomponents/carrecord.formcomponents';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { Router } from '@angular/router'; // додано для навігації
import { UserService } from 'src/app/modules/user/services/user.service'; // Імпортуємо UserService, якщо потрібно
import { log } from 'console';

@Component({
	templateUrl: './carhistory.component.html',
	styleUrls: ['./carhistory.component.scss'],
	standalone: false,
})
export class CarhistoryComponent {
	isMenuOpen = false;

	constructor(
		public userService: UserService,
		private _form: FormService,
		private _carrecordService: CarrecordService,
		private _translate: TranslateService,
		private _router: Router
	) {}

	back(): void {
		window.history.back();  // функція для повернення на попередню сторінку
	}

	create(): void {
		this._form.modal<Carrecord>(this._form.getForm('carrecord', carrecordFormComponents), {
			label: 'Create Carrecord',
			click: (created: unknown, close: () => void) => {
				close();

				const carrecord = created as Carrecord;
				carrecord.__created = false;

				// якщо потрібно, можна додати інші дані до carrecord
				// carrecord.car = someCarId;  // Якщо потрібно передати car_id

				this._carrecordService.create(carrecord).subscribe(() => {
					// після створення, перенаправляємо користувача на певну сторінку
					this._router.navigate(['/сarrecord']);
				});
			},
		});
	}
}
