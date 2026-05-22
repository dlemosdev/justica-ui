import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JusticaHeaderComponent} from './justica-header.component';
import {JusticaLogoutComponent} from './justica-logout/justica-logout.component';
import {JusticaButtonModule} from '../../../components/justica-button';

@NgModule({
  declarations: [JusticaHeaderComponent, JusticaLogoutComponent],
  imports: [CommonModule, JusticaButtonModule],
  exports: [JusticaHeaderComponent]
})
export class JusticaHeaderModule {}
