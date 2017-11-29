import { Component, Input, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { RxTableSort } from '../models/RxTableRequest';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'th[sort]',
  templateUrl: '../views/rxtable-header.component.html',
  styleUrls: ['../views/rxtable-header.component.css']
})

export class RxTableHeaderComponent implements OnDestroy {

  @Input() field: string;
  direction = '';
  private _sort: Subject<RxTableSort> = new Subject<RxTableSort>();
  public readonly sort: Observable<RxTableSort> = this._sort.asObservable();

  constructor() {
  }

  doSort(): void {
    this.direction = this.direction === 'ASC' || this.direction === '' ? 'DESC' : 'ASC';
    this._sort.next(new RxTableSort(this.field, this.direction));
  }

  resetSort(): void {
    this.direction = '';
  }

  ngOnDestroy(): void {
    this._sort.unsubscribe();
  }
}
