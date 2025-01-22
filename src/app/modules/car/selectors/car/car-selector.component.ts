import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CarService } from '../../services/car.service';
import { Car } from '../../interfaces/car.interface';

@Component({
	selector: 'car-selector',
	templateUrl: './car-selector.component.html',
	styleUrls: ['./car-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Car[] {
		return this._carService.cars;
	}

	constructor(private _carService: CarService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
