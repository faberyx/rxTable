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
import { RxTableSort, RxTableRequest } from '../models/RxTableRequest';
import { Observable } from 'rxjs/Observable';
import { RxTableHeaderComponent } from '../components/rxtable-header.component';
import { RxTableForDirective } from '../components/rxtable-tablefor.directive';

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
  @Input() cssPaginator = 'pagination';
  @Input() cssFooter: string;
  @Input() pagination = true;
  @Input() sorting = true;
  @Input() paginationPages = false;
  @Input()
  set params(name: any) {
    this._params = name;
    this.goToPage(1);
  }
  get params(): any { return this._params; }

  total = 0;
  page = 1;
  paginationLimit = 0;
  private _sort: RxTableSort;
  private _params: any;

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
    this.forDirective.updateData({ page: this.page, limit: this.paginationLimit, sort: this._sort, params: this.params } as RxTableRequest);
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

  setLimit(n: number): void {
    this.paginationLimit = n;
    this.goToPage(1);
  }
}
