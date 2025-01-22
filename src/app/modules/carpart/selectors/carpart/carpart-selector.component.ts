import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CarpartService } from '../../services/carpart.service';
import { Carpart } from '../../interfaces/carpart.interface';

@Component({
	selector: 'carpart-selector',
	templateUrl: './carpart-selector.component.html',
	styleUrls: ['./carpart-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Carpart[] {
		return this._carpartService.carparts;
	}

	constructor(private _carpartService: CarpartService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
