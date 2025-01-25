import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MarketcarsComponent } from './marketcars.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: MarketcarsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MarketcarsComponent]
})
export class MarketcarsModule {}
