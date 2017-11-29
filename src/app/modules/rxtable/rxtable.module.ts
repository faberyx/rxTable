import { RxTablePaginationComponent } from './components/rxtable-pagination.component';
import { RxTableHeaderComponent } from './components/rxtable-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxTableComponent } from './components/rxtable.component';
import { RxTableForDirective } from './components/rxtable-tablefor.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RxTableComponent,
    RxTableHeaderComponent,
    RxTablePaginationComponent,
    RxTableForDirective
  ],
  exports: [
    RxTableComponent,
    RxTableForDirective,
    RxTableHeaderComponent
  ]
})
export class RxtableModule { }
