import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CarrecordService } from '../../services/carrecord.service';
import { Carrecord } from '../../interfaces/carrecord.interface';

@Component({
	selector: 'carrecord-selector',
	templateUrl: './carrecord-selector.component.html',
	styleUrls: ['./carrecord-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Carrecord[] {
		return this._carrecordService.carrecords;
	}

	constructor(private _carrecordService: CarrecordService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
