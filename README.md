# RXTable-library
Easy to use Angular 4+ Table component with both server or client side pagination and sorting.

### How to Use

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

### Installation

```sh
$ npm install rxtable-library
```

### Development

Want to contribute? Great!



### Todos

 - Write  Tests

License
----

MIT