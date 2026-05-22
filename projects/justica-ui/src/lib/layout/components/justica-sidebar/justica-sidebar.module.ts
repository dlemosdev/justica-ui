import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JusticaSidebarComponent} from './justica-sidebar.component';

@NgModule({
  declarations: [JusticaSidebarComponent],
  imports: [
    CommonModule
  ],
  exports: [JusticaSidebarComponent]
})
export class JusticaSidebarModule { }
