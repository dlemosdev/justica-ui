import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModalPageComponent} from './pages/modal-page/modal-page.component';
import {ButtonPageComponent} from './pages/button-page/button-page.component';
import {DialogPageComponent} from './pages/dialog-page/dialog-page.component';
import {JusticaAutenticadoGuard} from '@justica/core';
import {LayoutPageComponent} from './pages/layout-page/layout-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'layout'},
  {path: 'layout', component: LayoutPageComponent, canActivate: [JusticaAutenticadoGuard]},
  {path: 'modal', component: ModalPageComponent, canActivate: [JusticaAutenticadoGuard]},
  {path: 'button', component: ButtonPageComponent, canActivate: [JusticaAutenticadoGuard]},
  {path: 'dialog', component: DialogPageComponent, canActivate: [JusticaAutenticadoGuard]},
  {path: '**', redirectTo: 'layout'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
