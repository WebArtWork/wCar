import { Component } from '@angular/core';
import { Car } from 'src/app/modules/car/interfaces/car.interface';
import { CarService } from 'src/app/modules/car/services/car.service';

@Component({
	templateUrl: './mycars.component.html',
	styleUrls: ['./mycars.component.scss'],
	standalone: false
})
export class MycarsComponent {
	isMenuOpen = false;


	mycars: Car[] = [];
	constructor(private _carService: CarService) {}
	ngOnInit(): void {
		this.loadMycars();
	}
	private loadMycars(): void {
		this._carService.get().subscribe((data: Car[]) => {
			this.mycars = data;
		});
	}
}
