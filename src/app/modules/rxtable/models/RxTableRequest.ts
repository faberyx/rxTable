export class RxTableRequest {
    page: number;
    limit: number;
    params: any;
    sort: RxTableSort;
}

export class RxTableSort {
    field: string;
    dir: string;
    constructor(field: string, dir: string) {
        this.dir = dir;
        this.field = field;
    }
}