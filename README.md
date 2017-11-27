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
_app.component.html_

```javascript
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
import { IRxTableResponse } from 'RxTableResponse';
import { RxTableRequest } from 'RxTableRequest';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';


@Injectable()
export class DataService {
    constructor(private http: HttpClient) {
    }
   
    getData(request?: IPaginationRequest): Observable<IRxTableResponse<Array<Foo>>> {
        return this.http.get<IRxTableResponse<Array<Foo>>>('/api/endpoint', { params: request })
    }
}
```

### Options

Options for rxtable component

`<rx-table cssClass="table" cssPagination="pagination" pagination="true" sorting="true">`

| Setting       | Description                              | Default Value  |
| ------------- |------------------------------------------| ---------------|
| cssClass      | css class applied to the table           | `table`        |
| cssPagination | css class applied to the pagination      | `pagination`   |
| pagination    | enable table pagination                  | `true`         |
| sorting       | enable table sorting                     | `true`         |

Options for rxTableFor directive

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

### Development

Want to contribute? Great!

npm library:
[rxtable-library](https://www.npmjs.com/package/rxtable-library)


### Todos

 - Write  Tests

License
----

MIT