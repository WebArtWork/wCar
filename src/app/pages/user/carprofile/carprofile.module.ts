import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CarprofileComponent } from './carprofile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CarprofileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CarprofileComponent]
})
export class CarprofileModule {}
