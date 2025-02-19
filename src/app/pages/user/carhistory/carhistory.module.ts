import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CarhistoryComponent } from './carhistory.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CarhistoryComponent
	},
	{
		path: ':car_id',
		component: CarhistoryComponent
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CarhistoryComponent]
})
export class CarhistoryModule {}
