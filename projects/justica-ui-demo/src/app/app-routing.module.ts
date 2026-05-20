import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModalPageComponent} from './pages/modal-page/modal-page.component';
import {ButtonPageComponent} from './pages/button-page/button-page.component';
import {JusticaAutenticadoGuard} from '@justica/core';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'modal'},
  {path: 'modal', component: ModalPageComponent, canActivate: [JusticaAutenticadoGuard]},
  {path: 'button', component: ButtonPageComponent, canActivate: [JusticaAutenticadoGuard]},
  {path: '**', redirectTo: 'modal'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
