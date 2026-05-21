import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {JusticaModalComponent} from './justica-modal.component';
import {JusticaModalService} from './justica-modal.service';

@NgModule({
  declarations: [JusticaModalComponent],
  imports: [CommonModule],
  exports: [JusticaModalComponent],
  providers: [JusticaModalService]
})
export class JusticaModalModule {}
