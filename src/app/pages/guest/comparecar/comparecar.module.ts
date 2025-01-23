import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ComparecarComponent } from './comparecar.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ComparecarComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ComparecarComponent]
})
export class ComparecarModule {}
