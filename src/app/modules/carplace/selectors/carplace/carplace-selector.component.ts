import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CarplaceService } from '../../services/carplace.service';
import { Carplace } from '../../interfaces/carplace.interface';

@Component({
	selector: 'carplace-selector',
	templateUrl: './carplace-selector.component.html',
	styleUrls: ['./carplace-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Carplace[] {
		return this._carplaceService.carplaces;
	}

	constructor(private _carplaceService: CarplaceService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
