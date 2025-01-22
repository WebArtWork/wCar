import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CarserviceService } from '../../services/carservice.service';
import { Carservice } from '../../interfaces/carservice.interface';

@Component({
	selector: 'carservice-selector',
	templateUrl: './carservice-selector.component.html',
	styleUrls: ['./carservice-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Carservice[] {
		return this._carserviceService.carservices;
	}

	constructor(private _carserviceService: CarserviceService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
