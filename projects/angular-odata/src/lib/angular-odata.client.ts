import { ODataConfig } from './angular-odata.config';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export enum ODataReturnModification {
    default = '',
    representation = 'representation',
    minimal = 'minimal'
}

@Injectable({ providedIn: 'root' })
export class ODataClient {
    constructor(private http: HttpClient) { }

    public get<T>(config: ODataConfig, resourcePath: string, key: string | number, propertyPath: string, params: HttpParams): Observable<T> {
        const url = this.getURL(config.rootURL, resourcePath, key, propertyPath);
        return this.http.get(url, {
            params: params
        }).pipe(map(response => this.deserializeResponse(response)));
    }

    public post<T>(config: ODataConfig, resourcePath: string, entity: T, returnModification: ODataReturnModification): Observable<T> {
        const url = this.getURL(config.rootURL, resourcePath);
        return this.http.post(url, entity, {
            headers: this.getHeaders(returnModification)
        }).pipe(map(response => this.deserializeResponse(response)));
    }

    public patch<T>(config: ODataConfig, resourcePath: string, key: string | number, entity: Partial<T>, returnModification: ODataReturnModification): Observable<T> {
        const url = this.getURL(config.rootURL, resourcePath, key);
        return this.http.patch<T>(url, entity, {
            headers: this.getHeaders(returnModification)
        });
    }

    public put<T>(config: ODataConfig, resourcePath: string, key: string | number, entity: T, returnModification: ODataReturnModification): Observable<T> {
        const url = this.getURL(config.rootURL, resourcePath, key);
        return this.http.put<T>(url, entity, {
            headers: this.getHeaders(returnModification)
        });
    }

    public delete(config: ODataConfig, resourcePath: string, key: string | number): Observable<Object> {
        const url = this.getURL(config.rootURL, resourcePath, key);
        return this.http.delete(url, {
            headers: this.getHeaders()
        });
    }

    private getHeaders(returnModification: ODataReturnModification = ODataReturnModification.default): HttpHeaders {
        let headers = new HttpHeaders().append('Content-Type', 'application/json');
        if(returnModification !== ODataReturnModification.default) {
            headers = headers.append('Prefer', 'return=' + returnModification);
        }
        return headers;
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

    private deserializeResponse<T>(response: Object): T {
        const keys = Object.keys(response).filter(property => !property.startsWith('@odata'));
        // If the result is singular it is available inside the 'value' property.
        if (keys.length === 1 && keys[0] === 'value') {
            return response['value'] as T;
        }
        // Otherwise it is available in the current result.
        const result: T = {} as T;
        keys.forEach(p => result[p] = response[p]);
        return result;
    }
}