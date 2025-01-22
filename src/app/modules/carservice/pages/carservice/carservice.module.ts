import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CarserviceComponent } from './carservice.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CarserviceComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CarserviceComponent],
	providers: []
})
export class CarserviceModule {}
