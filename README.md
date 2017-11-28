# RXTable-library
Easy to use Angular 4+ Table component with both server or client side pagination and sorting.

---
### How to Use

Typical use of the rxtable with a observable service with server side pagination

---
_app.component.html_
```html
<rx-table cssClass="table">
  <thead>
    <tr>
      <th sort field="id">ID</th>
      <th sort field="number">Number</th>
      <th>Start time</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr *rxTableFor="let data of testdata; client:true; pagination:2">
      <td>{{data.id}}</td>
      <td>{{data.number}}</td>     
      <td>{{data.startDate}}</td> 
      <td>
        <a  class="btn  btn-outline-primary">
          <i class="fa fa-search"></i>&nbsp; Details
        </a>
      </td>
    </tr>
  </tbody>
</rx-table>
```
---
_app.component.ts_

```javascript
import { DataService } from './dataService';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


export class AppComponent implements OnInit {

 testdata: Function;

  constructor(public _service: DataService) {
  }

  ngOnInit() {
    this.testdata = this._service.getData.bind(this._service);
  }
}

```
---
_dataService.ts_

```javascript

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';
import { RxTableRequest } from 'rxtable-library/src/app/modules/rxtable/models/RxTableRequest';
import { IRxTableResponse} from 'rxtable-library/src/app/modules/rxtable/models/RxTableResponse';


@Injectable()
export class DataService {
    constructor(private http: HttpClient) {
    }

    getData(request?: RxTableRequest): Observable<IRxTableResponse<Array<any>>> {
        return this.http.get<IRxTableResponse<Array<any>>>('/api/endpoint', { params: this.toHttpParams(request) })
    }

    private toHttpParams(params): HttpParams {
        if (!params) {
            return new HttpParams();
        }
        return Object.getOwnPropertyNames(params)
            .reduce((p, key) => {
                if (key === 'sort') {
                    if (params[key]) {
                        return p.set('sort', params[key].field).set('dir', params[key].dir);
                    } else {
                        return p.set(key, '');
                    }
                } else {
                    return p.set(key, params[key]);
                }
            }, new HttpParams());
    }
}
```

### Options

Options for `rxtable` component

`<rx-table cssClass="table" cssPagination="pagination" pagination="true" sorting="true">`

| Setting       | Description                              | Default Value  |
| ------------- |------------------------------------------| ---------------|
| cssClass      | css class applied to the table           | `table`        |
| cssPagination | css class applied to the pagination      | `pagination`   |
| pagination    | enable table pagination                  | `true`         |
| sorting       | enable table sorting                     | `true`         |

Options for `*rxTableFor` directive

`*rxTableFor="let data of testdata; client:true; pagination:2">`

| Setting       | Description                              | Default Value  |
| ------------- |------------------------------------------| ---------------|
| testdata      | array or observable function             |                |
| client        | client/server pagination                 | `false`        |
| pagination    | number of rows in the table per page     | `20`           |


### Installation

```sh
$ npm install rxtable-library
```

Update `app.module.ts`

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RxtableModule } from 'rxtable-library';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RxtableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Development

Want to contribute? Great!

npm library:
[rxtable-library](https://www.npmjs.com/package/rxtable-library)


### Todos

 - Write  Tests

License
----

MIT
