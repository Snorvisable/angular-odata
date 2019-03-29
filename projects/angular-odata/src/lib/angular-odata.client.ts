import { ODataConfig } from './angular-odata.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ODataClient {
    constructor(private http: HttpClient) { }

    public get<T>(config: ODataConfig, resourcePath: string, key: string | number, propertyPath: string, params: HttpParams): Observable<T> {
        const url = this.getURL(config.rootURL, resourcePath, key, propertyPath);
        return this.http.get(url, {
            params: params
        }).pipe(map(r => {
            const keys = Object.keys(r).filter(property => !property.startsWith('@odata'));
            // If the result is singular it is available inside the 'value' property.
            if (keys.length === 1 && keys[0] === 'value') {
                return r['value'] as T;
            }
            // Otherwise it is available in the current result.
            const result: T = {} as T;
            keys.forEach(p => result[p] = r[p]);
            return result;
        }));
    }

    public post<T>(config: ODataConfig, resourcePath: string, entity: T): Observable<T> {
        const url = this.getURL(config.rootURL, resourcePath);
        return this.http.post<T>(url, entity);
    }

    public put<T>(config: ODataConfig, resourcePath: string, entity: T): Observable<T> {
        const url = this.getURL(config.rootURL, resourcePath);
        return this.http.put<T>(url, entity);
    }

    private getURL(rootURL: string, resourcePath: string, key?: string | number, propertyPath?: string): string {
        if (!key && propertyPath)
            throw new Error(`The parameter \'key\' is required when parameter \'propertyPath\' is supplied.`);
        let url = rootURL;

        if (!rootURL.endsWith('/') && !resourcePath.startsWith('/'))
            url += '/';
        url += resourcePath;

        if (url.endsWith('/'))
            url = url.substr(0, url.length - 1);

        if (key)
            if (typeof key === "string")
                url += `(\'${key}\')`;
            else
                url += `(${key})`;

        if (propertyPath)
            url += `/${propertyPath}`;

        return url;
    }

    protected getArgumentError(parameter: string): Error {
        return new Error(`The value for parameter \'${parameter}\' is not valid.`);
    }
}