import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './core/theme/guest/guest.component';
import { UserComponent } from './core/theme/user/user.component';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { environment } from 'src/environments/environment';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AdminsGuard } from './core/guards/admins.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		component: GuestComponent,
		children: [
			/* guest */
			{
				path: 'components',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Components'
					}
				},
				loadChildren: () =>
					import('./pages/guest/components/components.module').then(
						(m) => m.ComponentsModule
					)
			},
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.module').then(
						(m) => m.SignModule
					)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* user */
			{
				path: 'mycars',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Mycars'
					}
				},
				loadChildren: () => import('./pages/user/mycars/mycars.module').then(m => m.MycarsModule)
			}, 
			{
				path: 'marketparts',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Marketparts'
					}
				},
				loadChildren: () => import('./pages/user/marketparts/marketparts.module').then(m => m.MarketpartsModule)
			},
			{
				path: 'marketcars',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Marketcars'
					}
				},
				loadChildren: () => import('./pages/user/marketcars/marketcars.module').then(m => m.MarketcarsModule)
			},
			{
				path: 'compare',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Compare'
					}
				},
				loadChildren: () => import('./pages/user/compare/compare.module').then(m => m.CompareModule)
			},
			{
				path: 'carplace',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Carplace'
					}
				},
				loadChildren: () => import('./modules/carplace/pages/carplace/carplace.module').then(m => m.CarplaceModule)
			},
			{
				path: 'cartrade',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Cartrade'
					}
				},
				loadChildren: () => import('./modules/cartrade/pages/cartrade/cartrade.module').then(m => m.CartradeModule)
			},
			{
				path: 'carservice',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Carservice'
					}
				},
				loadChildren: () => import('./modules/carservice/pages/carservice/carservice.module').then(m => m.CarserviceModule)
			},
			{
				path: 'carpart',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Carpart'
					}
				},
				loadChildren: () => import('./modules/carpart/pages/carpart/carpart.module').then(m => m.CarpartModule)
			},
			{
				path: 'carrecord',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Carrecord'
					}
				},
				loadChildren: () => import('./modules/carrecord/pages/carrecord/carrecord.module').then(m => m.CarrecordModule)
			},
			{
				path: 'car',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Car'
					}
				},
				loadChildren: () => import('./modules/car/pages/car/car.module').then(m => m.CarModule)
			},
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		component: UserComponent,
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.module').then(
						(m) => m.UsersModule
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import(
						'./modules/customform/pages/customforms/customforms.module'
					).then((m) => m.CustomformsModule)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./core/modules/translate/pages/translates/translates.module'
					).then((m) => m.TranslatesModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent],
	imports: [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: environment.meta.title,
					description: environment.meta.description,
					titleSuffix: ' | ' + environment.meta.title,
					'og:image': environment.meta.icon
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			},
			alert: {
				alerts: {
					/* alerts */
				}
			},
			loader: {
				loaders: {
					/* loaders */
				}
			},
			popup: {
				popups: {
					/* popups */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [
		/* providers */
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		AuthenticatedGuard,
		GuestGuard,
		AdminsGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
