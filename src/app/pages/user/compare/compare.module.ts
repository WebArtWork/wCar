import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CompareComponent } from './compare.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CompareComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CompareComponent]
})
export class CompareModule {}
