import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CarrecordComponent } from './carrecord.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CarrecordComponent
	},
	{
		path: ':car_id',
		component: CarrecordComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CarrecordComponent],
	providers: []
})
export class CarrecordModule {}
