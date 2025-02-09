import { Component, Input } from '@angular/core';
import { Car } from 'src/app/modules/car/interfaces/car.interface';

@Component({
  selector: 'app-mycar',
  standalone: false,

  templateUrl: './mycar.component.html',
  styleUrl: './mycar.component.scss'
})
export class MycarComponent {
	@Input() car : Car
}
