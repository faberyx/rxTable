import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'rxtable-pagination',
  templateUrl: '../views/rxtable-pagination.component.html'
})

export class RxTablePaginationComponent {

  @Input() count: number;
  @Input() page: number;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  @Input() pagesToShow = 5;
  @Input() limit = 20;
  @Input() cssClass = 'pagination';

  constructor() { 
  }

  getMin(): number {
    return ((this.limit * this.page) - this.limit) + 1;
  }

  getMax(): number {
    let max = this.limit * this.page;
    if (max > this.count) {
      max = this.count;
    }
    return max;
  }

  onPage(n: number): void {
    this.goPage.emit(n);
  }

  onPrev(): void {
    if (this.page !== 1)
      this.goPrev.emit(true);
  }

  onNext(next: boolean): void {
    if (!this.lastPage())
      this.goNext.emit(next);
  }

  totalPages(): number {
    return Math.ceil(this.count / this.limit) || 0;
  }

  lastPage(): boolean {
    return this.limit * this.page >= this.count;
  }

  getPages(): number[] {
    const c = Math.ceil(this.count / this.limit);
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }
}
