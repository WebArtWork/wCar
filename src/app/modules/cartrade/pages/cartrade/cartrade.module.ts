import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CartradeComponent } from './cartrade.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CartradeComponent
	},
	{
		path: ':car_id',
		component: CartradeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CartradeComponent],
	providers: []
})
export class CartradeModule {}
