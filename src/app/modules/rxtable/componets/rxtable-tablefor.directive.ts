import { Subject } from 'rxjs/Subject';
import { RxTableRequest } from '../models/RxTableRequest';
import { IRxTableResponse } from '../models/RxTableResponse';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  Directive, Input,
  TemplateRef,
  ViewContainerRef,
  IterableDiffer,
  ChangeDetectorRef,
  IterableDiffers,
  DoCheck,
  NgIterable,
  IterableChanges,
  EmbeddedViewRef,
  IterableChangeRecord,
  OnChanges,
  TrackByFunction,
  SimpleChanges,
  ViewRef,
  EventEmitter
} from '@angular/core';
import { isArray } from 'util';

export class RxTableForOfContext {
  constructor(
    public $implicit: any, public tableForOf: NgIterable<any>, public client = false) { }
}
@Directive({
  selector: '[rxTableFor]',
})
export class RxTableForDirective implements DoCheck {

  total = new BehaviorSubject<number>(0);
  isArray = false;

  private _isClientOperation = false;
  private _firstPage = 1;
  private _limit: number = 20;
  private _fnService: Function;
  private _collection: any;
  private _differ: IterableDiffer<any> | null = null;
  private _viewMap: Map<any, ViewRef> = new Map<any, ViewRef>();
  private _currentRequest: any;

  @Input()
  get rxTableForClient(): boolean {
    return this._isClientOperation;
  }

  set rxTableForClient(isClient: boolean) {
    this._isClientOperation = isClient;
  }

  @Input()
  get rxTableForPagination(): number {
    return this._limit;
  }

  set rxTableForPagination(pages: number) {
    this._limit = pages;
  }

  @Input()
  set rxTableForOf(data: any) {

    if (data) {
      if (Array.isArray(data)) { // collection is just an array
        this.isArray = true;
        this._collection = data;
        if (this._collection && !this._differ) {
          this._differ = this._differs.find(this._collection).create(null);
        }
      }
      else { // collection is an observable
        this._fnService = data;
        this._currentRequest = { page: this._firstPage, limit: this._limit, sort: null } as RxTableRequest;
        try {
          const srv = (data(this._currentRequest) as Observable<any>);
          srv.subscribe(result => {
            this._collection = this._getCollection(result);
            if (this._collection && !this._differ) {
              this._differ = this._differs.find(this._collection).create(null);
            }
          });
        } catch (err) {
          throw Error('Function does not return an observable');
        }
      }
    }
  }

  get rxTableForOf() {
    return this._collection;
  }

  constructor(
    private _viewContainer: ViewContainerRef,
    private _template: TemplateRef<RxTableForOfContext>,
    private _differs: IterableDiffers) { }

  private _getCollection(dtn: any): Array<any> {
    if (Array.isArray(dtn)) {
      return this._clientRender(dtn);
    }
    try {
      const data = (dtn as IRxTableResponse<any>);
      this.total.next(data.total);
      if (this.rxTableForClient)
        return this._clientRender(data.data);
      else
        return data.data;
    } catch (err) {
      throw Error('Function response does not implement interface')
    }
  }

  updateData(request: RxTableRequest) {
    this._currentRequest = request;
    const srv = this._fnService(request) as Observable<any>;
    srv.subscribe(result => {
      this._collection = this._getCollection(result);
      if (this._collection && !this._differ) {
        this._differ = this._differs.find(this._collection).create(null);
      }
    });
  }

  ngDoCheck(): void {
    if (this._differ) {
      const changes = this._differ.diff(this.rxTableForOf);
      if (changes) { this._applyChanges(changes); }
    }
  }

  private _clientRender(collection: Array<any>): Array<any> {
    
    const page = this._currentRequest.page;
    collection = collection.slice((page - 1) * this._limit, page * this._limit);

    if (this._currentRequest.sort) {
      collection = collection.sort(this._sortFn(this._currentRequest.sort.field, this._currentRequest.sort.dir))
    }
    return collection;
  }

  private _applyChanges(changes: IterableChanges<any>) {

    changes.forEachRemovedItem((change) => {
      const view = this._viewMap.get(change.item);
      const viewIndex = this._viewContainer.indexOf(view);
      this._viewContainer.remove(viewIndex);
      this._viewMap.delete(change.item);
    });

    changes.forEachAddedItem((change) => {
      const view = this._viewContainer.createEmbeddedView(this._template);
      view.context.$implicit = change.item;
      this._viewMap.set(change.item, view);
    });
  }

  private _sortFn(key, order = 'ASC') {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'DESC') ? (comparison * -1) : comparison
      );
    };
  }
}

