import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {JusticaToastComponent} from './justica-toast.component';
import {JusticaToastItemComponent} from './components/justica-toast-item.component';

@NgModule({
  declarations: [JusticaToastComponent, JusticaToastItemComponent],
  imports: [CommonModule],
  exports: [JusticaToastComponent]
})
export class JusticaToastModule {}
