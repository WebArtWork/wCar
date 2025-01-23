import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MycarsComponent } from './mycars.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: MycarsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		MycarsComponent
	],
	providers: []

})

export class MycarsModule { }
