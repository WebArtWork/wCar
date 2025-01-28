import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CarComponent } from './car.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CarComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CarComponent],
	providers: []
})
export class CarModule {}
