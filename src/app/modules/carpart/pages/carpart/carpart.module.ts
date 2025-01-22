import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CarpartComponent } from './carpart.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CarpartComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CarpartComponent],
	providers: []
})
export class CarpartModule {}
