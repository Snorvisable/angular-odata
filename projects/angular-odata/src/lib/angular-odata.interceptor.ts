import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ODataConfig } from './angular-odata.config';

@Injectable()
export class ODataInterceptor implements HttpInterceptor {
    constructor(private config: ODataConfig) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.config.defaultHttpOptions) {
            // Add default headers.
            let headers: HttpHeaders = request.headers;
            if(this.config.defaultHttpOptions.headers && this.config.defaultHttpOptions.headers.keys()) {
                this.config.defaultHttpOptions.headers.keys().forEach(key => 
                    headers = headers.append(key, this.config.defaultHttpOptions.headers.get(key)));
            }

            // Add default params
            let params: HttpParams = request.params;
            if(this.config.defaultHttpOptions.params && this.config.defaultHttpOptions.params.keys()) {
                this.config.defaultHttpOptions.params.keys().forEach(key => 
                    params = params.append(key, this.config.defaultHttpOptions.params.get(key)));
            }

            const updatedRequest = request.clone({
                headers: headers,
                params: params
            });
            return next.handle(updatedRequest);
        }
        else {
            return next.handle(request);
        }
    }
}