import { IRxTableResponse } from './modules/rxtable/models/RxTableResponse';
import { RxTableRequest } from './modules/rxtable/models/RxTableRequest';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  testdata: Function;

  ngOnInit() {
    this.testdata = this.getData.bind(this);
  }

  getData(request: RxTableRequest): Observable<IRxTableResponse<Array<any>>> {

    const data = {
      total: 4, data: [{ id: 1, number: '#2978', startDate: '03-Oct-2017 15:59:24' },
      { id: 2, number: '#3978', startDate: '04-Oct-2017 15:59:24' },
      { id: 3, number: '#4978', startDate: '06-Oct-2017 15:59:24' },
      { id: 4, number: '#5978', startDate: '07-Oct-2017 15:59:24' },
      { id: 5, number: '#5979', startDate: '08-Oct-2017 15:59:24' },
      ]
    } as IRxTableResponse<Array<any>>;
    return Observable.of(data);
  }
}
