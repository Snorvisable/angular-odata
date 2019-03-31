import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class ODataConfig {
    rootURL: string;
    defaultHttpOptions?: {
        headers?: HttpHeaders;
        params?: HttpParams;
    }
}