import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CartradeService } from '../../services/cartrade.service';
import { Cartrade } from '../../interfaces/cartrade.interface';

@Component({
	selector: 'cartrade-selector',
	templateUrl: './cartrade-selector.component.html',
	styleUrls: ['./cartrade-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Cartrade[] {
		return this._cartradeService.cartrades;
	}

	constructor(private _cartradeService: CartradeService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
