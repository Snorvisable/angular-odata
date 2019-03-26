import { IODataFilterQuery, ODataFilterQuery } from './filter/angular-odata-filter-query';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ODataConfig } from './angular-odata.config';
import { Observable } from 'rxjs';

export enum ODataOrderDirection {
    ascending = 'asc',
    descending = 'desc'
}

export interface IODataQuery<T> {
    expand(properties: string[]): IODataQuery<T>
    filter(filterAction: (filterQuery: IODataFilterQuery) => void): IODataQuery<T>;
    orderBy(property: string, direction: ODataOrderDirection): IODataQuery<T>;
    select(properties: string[]): IODataQuery<T>;
    skip(count: number): IODataQuery<T>;
    top(count: number): IODataQuery<T>;
    count(): Observable<number>;
    execute(): Observable<T>;
}

export class ODataQuery<T> implements IODataQuery<T> {
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

    constructor(private http: HttpClient, private config: ODataConfig, private resourcePath: string, private key?: number | string) { }

    public expand(properties: string[]): IODataQuery<T> {
        if (!properties)
            throw this._getArgumentError('properties');
        this._expand = this._expand.concat(properties);
        return this;
    }

    public filter(filterAction: (filterQuery: IODataFilterQuery) => void): IODataQuery<T> {
        const filterQuery = new ODataFilterQuery();
        filterAction(filterQuery);
        this._filter = filterQuery.toString();
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

    public count(): Observable<number> {
        this._count = true;
        return this._execute();
    }

    public execute(): Observable<T> {
        return this._execute();
    }

    private _execute<R>(): Observable<R> {
        const url = this._getURL();
        const queryOptions = this._getQueryOptions();
        return this.http.get<R>(url, {
            params: queryOptions
        });
    }

    private _getURL(): string {
        let url = this.config.rootURL;
        if (!this.config.rootURL.endsWith('/') && !this.resourcePath.startsWith('/'))
            url += '/';
        url += this.resourcePath;
        if (url.endsWith('/'))
            url = url.substr(0, url.length - 1);
        if (this.key)
            url += `(${this.key})`;
        return url;
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