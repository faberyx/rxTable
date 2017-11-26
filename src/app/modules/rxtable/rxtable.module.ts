import { RxTablePaginationComponent } from './componets/rxtable-pagination.component';
import { RxTableHeaderComponent } from './componets/rxtable-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxTableComponent } from './componets/rxtable.component';
import { RxTableForDirective } from './componets/rxtable-tablefor.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RxTableComponent,
    RxTableHeaderComponent,
    RxTablePaginationComponent,
    RxTableForDirective,
  ],
  exports: [
    RxTableComponent,
    RxTableForDirective,
    RxTableHeaderComponent
  ]
})
export class RxtableModule { }
