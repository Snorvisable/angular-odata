import { ODataFilterContinuationOperator, ODataFilterLogicalOperator } from './angular-odata-filter-operator';

export interface IODataFilterContinuation {
    readonly and: IODataFilterQuery;
    readonly or: IODataFilterQuery;
}

export interface IODataFilterQuery {
    equal(field: string, value: string | number) : IODataFilterContinuation;
    notEqual(field: string, value: string | number) : IODataFilterContinuation;
    greaterThan(field: string, value: string | number) : IODataFilterContinuation;
    greaterThanOrEqual(field: string, value: string | number) : IODataFilterContinuation;
    lessThan(field: string, value: string | number) : IODataFilterContinuation;
    lessThanOrEqual(field: string, value: string | number) : IODataFilterContinuation;
}

export class ODataFilterContinuation implements IODataFilterContinuation {

    constructor(private filterQuery: ODataFilterQuery) {}

    get and(): IODataFilterQuery {
        return this.filterQuery.applyContinuationOperator(ODataFilterContinuationOperator.and);
    }
    get or(): IODataFilterQuery {
        return this.filterQuery.applyContinuationOperator(ODataFilterContinuationOperator.or);
    }
}

export class ODataFilterQuery implements IODataFilterQuery {
    private _filter: string = '';

    public equal(field: string, value: string | number) : ODataFilterContinuation {
        return this.applyOperator(field, value, ODataFilterLogicalOperator.equal);
    }

    public notEqual(field: string, value: string | number) : ODataFilterContinuation {
        return this.applyOperator(field, value, ODataFilterLogicalOperator.notEqual);
    }

    public greaterThan(field: string, value: string | number) : ODataFilterContinuation {
        return this.applyOperator(field, value, ODataFilterLogicalOperator.greaterThan);
    }

    public greaterThanOrEqual(field: string, value: string | number) : ODataFilterContinuation {
        return this.applyOperator(field, value, ODataFilterLogicalOperator.greaterThanOrEqual);
    }

    public lessThan(field: string, value: string | number) : ODataFilterContinuation {
        return this.applyOperator(field, value, ODataFilterLogicalOperator.lessThan);
    }

    public lessThanOrEqual(field: string, value: string | number) : ODataFilterContinuation {
        return this.applyOperator(field, value, ODataFilterLogicalOperator.lessThanOrEqual);
    }

    public applyContinuationOperator(operator: ODataFilterContinuationOperator) : ODataFilterQuery {
        this._filter += ` ${operator}`;
        return this;
    }

    public toString() {
        return this._filter.substr(1);
    }

    private applyOperator(value1: string, value2: string | number, operator: ODataFilterLogicalOperator): ODataFilterContinuation {
        this._filter += ` ${value1} ${operator} ${(typeof value2 === "string") ? `\'${value2}\'` : value2}`;
        return new ODataFilterContinuation(this);
    }
}