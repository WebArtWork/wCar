import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './carhistory.component.html',
	styleUrls: ['./carhistory.component.scss'],
	standalone: false,
})
export class CarhistoryComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
