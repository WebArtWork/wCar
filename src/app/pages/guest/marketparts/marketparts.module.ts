import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MarketpartsComponent } from './marketparts.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: MarketpartsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		MarketpartsComponent
	],
	providers: []

})

export class MarketpartsModule { }
