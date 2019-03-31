import { IODataFilterQuery, ODataFilterQuery } from './filter/angular-odata-filter-query';
import { HttpParams } from '@angular/common/http';
import { ODataConfig } from './angular-odata.config';
import { Observable } from 'rxjs';
import { ODataClient } from './angular-odata.client';

export enum ODataOrderDirection {
    ascending = 'asc',
    descending = 'desc'
}

export interface IODataQuery<T> {
    expand(properties: string[]): IODataQuery<T>
    filter(filterAction: (filterQuery: IODataFilterQuery) => void): IODataQuery<T>;
    filter(filterString: string): IODataQuery<T>;
    orderBy(property: string, direction: ODataOrderDirection): IODataQuery<T>;
    select(properties: string[]): IODataQuery<T>;
    skip(count: number): IODataQuery<T>;
    top(count: number): IODataQuery<T>;
    getCount(): Observable<number>;
    getCollection(): Observable<T[]>;
    getSingle(key: string | number): Observable<T>;
    getPropertyValue<P>(key: string | number, property: string): Observable<P>;
    // getComplexPropertyValue<P>(key: string | number, property: string): Observable<P>;
    // getComplexPropertyValues<P>(key: string | number, property: string): Observable<P[]>;
}

export class ODataQuery<T> implements IODataQuery<T>{
    private readonly _topOption = '$top';
    private readonly _skipOption = '$skip';
    private readonly _countOption = '$count';
    private readonly _expandOption = '$expand';
    private readonly _selectOption = '$select';
    private readonly _searchOption = '$search';
    private readonly _filterOption = '$filter';
    private readonly _orderByOption = '$orderBy';

    private _count: boolean;

    private _skip: number;
    private _top: number;

    private _search: string;
    private _filter: string;

    private _expand: string[] = [];
    private _orderBy: string[] = [];
    private _select: string[] = [];

    constructor(private client: ODataClient, private config: ODataConfig, private resourcePath: string) { }

    public expand(properties: string[]): IODataQuery<T> {
        if (!properties)
            throw this._getArgumentError('properties');
        this._expand = this._expand.concat(properties);
        return this;
    }

    public filter(filterString: ''): IODataQuery<T>;
    public filter(filterAction: (filterQuery: IODataFilterQuery) => void): IODataQuery<T>;
    public filter(filterActionOrString: ((filterQuery: IODataFilterQuery) => void) | string) {
        if (typeof filterActionOrString === "string") {
            this._filter = filterActionOrString;
        }
        else {
            const filterQuery = new ODataFilterQuery();
            filterActionOrString(filterQuery);
            this._filter = filterQuery.toString();
        }
        return this;
    }

    public orderBy(property: string, direction: ODataOrderDirection): IODataQuery<T> {
        if (!property)
            throw this._getArgumentError('property');
        if (!direction)
            throw this._getArgumentError('direction');
        this._orderBy.push(`${property} ${direction}`);
        return this;
    }

    public select(properties: string[]): IODataQuery<T> {
        if (!properties)
            throw this._getArgumentError('properties');
        this._select = this._select.concat(properties);
        return this;
    }

    public skip(count: number): IODataQuery<T> {
        if (!count)
            throw this._getArgumentError('count');
        this._skip = count;
        return this;
    }

    public top(count: number): IODataQuery<T> {
        if (!count)
            throw this._getArgumentError('count');
        this._top = count;
        return this;
    }

    public getCount(): Observable<number> {
        this._count = true;
        return null;
    }

    public getPropertyValue<P>(key: string | number, property: string): Observable<P> {
        if (!key)
            throw this._getArgumentError('key');
        if (!property)
            throw this._getArgumentError('property');
        return this._execute<P>(key, property);
    }

    public getSingle<T>(key: string | number): Observable<T> {
        if (!key)
            throw this._getArgumentError('key');
        return this._execute<T>(key);
    }

    public getCollection<T>(): Observable<T[]> {
        return this._execute<T[]>();
    }

    private _execute<R>(key?: string | number, propertyPath?: string): Observable<R> {
        return this.client.get<R>(this.config, this.resourcePath, key, propertyPath, this._getQueryOptions());
    }

    private _getQueryOptions(): HttpParams {
        let params = new HttpParams();

        if (this._filter)
            params = params.append(this._filterOption, this._filter);
        if (this._orderBy.length)
            params = params.append(this._orderByOption, this._orderBy.join(', '));
        if (this._top)
            params = params.append(this._topOption, this._top.toString());
        if (this._skip)
            params = params.append(this._skipOption, this._skip.toString());
        if (this._expand.length)
            params = params.append(this._expandOption, this._expand.join(', '));
        if (this._select.length)
            params = params.append(this._selectOption, this._select.join(', '));
        if (this._search)
            params = params.append(this._searchOption, this._search);
        if (this._count)
            params = params.append(this._countOption, this._count.toString());

        return params;
    }

    private _getArgumentError(parameter: string) {
        return new Error(`The value for parameter \'${parameter}\' is not valid.`);
    }
}