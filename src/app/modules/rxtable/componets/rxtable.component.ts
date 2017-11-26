import {
  Component,
  Input,
  Output,
  ContentChild,
  forwardRef,
  ContentChildren,
  QueryList,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { RxTableSort, RxTableRequest } from '../models/RxTableRequest'
import { Observable } from 'rxjs/Observable';
import { RxTableHeaderComponent } from '../componets/rxtable-header.component';
import { RxTableForDirective } from '../componets/rxtable-tablefor.directive';

import 'rxjs/add/operator/merge';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'rx-table',
  templateUrl: '../views/rxtable.component.html'
})

export class RxTableComponent implements AfterViewInit {

  @ContentChildren(forwardRef(() => RxTableHeaderComponent)) header: QueryList<RxTableHeaderComponent>;
  @ContentChild(forwardRef(() => RxTableForDirective)) forDirective: RxTableForDirective;

  @Input() cssClass = 'table';
  @Input() cssPagination = 'pagination';
  @Input() pagination = true;
  @Input() sorting = true;

  total = 0;
  page = 1;
  paginationLimit = 0;
  private _sort: RxTableSort;

  constructor() {
  }

  ngAfterViewInit() {    
    if (this.pagination) {
      Promise.resolve(null).then(() => {
        this.paginationLimit = this.forDirective.rxTableForPagination;       
        this.forDirective.total.subscribe(t => this.total = t);
      });  
    }
    if (this.sorting) {
      this.header
        .map(s => s.sort)
        .reduce((value, element) => value.merge(element))
        .subscribe(x => {
          this._sort = x;
          this.setPage();
          this.header.filter(f => f.field !== x.field).forEach(r => r.resetSort());
        });
    }
  }

  setPage() {
    this.forDirective.updateData({ page: this.page, limit: this.paginationLimit, sort: this._sort } as RxTableRequest);
  }

  goToPage(n: number): void {
    this.page = n;
    this.setPage();
  }

  onNext(): void {
    this.page++;
    this.setPage();
  }

  onPrev(): void {
    this.page--;
    this.setPage();
  }
}
