import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JusticaHeaderComponent} from './justica-header.component';
import {JusticaLogoutComponent} from './justica-logout/justica-logout.component';
import {JusticaButtonModule} from '../../../components/justica-button/justica-button.module';
import {JusticaLogErroComponent} from './justica-log-erro/justica-log-erro.component';
import {JusticaNotificacaoComponent} from './justica-notificacao/justica-notificacao.component';
import {JusticaDiretivasModule} from '../../../diretivas/justica-diretivas.module';

@NgModule({
  declarations: [
    JusticaHeaderComponent,
    JusticaLogoutComponent,
    JusticaLogErroComponent,
    JusticaNotificacaoComponent
  ],
  imports: [CommonModule, JusticaButtonModule, JusticaDiretivasModule],
  exports: [JusticaHeaderComponent]
})
export class JusticaHeaderModule {}
