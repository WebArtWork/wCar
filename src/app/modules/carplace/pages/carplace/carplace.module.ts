import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CarplaceComponent } from './carplace.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CarplaceComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CarplaceComponent],
	providers: []
})
export class CarplaceModule {}
