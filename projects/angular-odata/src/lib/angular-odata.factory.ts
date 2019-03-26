import { Injectable } from '@angular/core';
import { ODataConfig } from './angular-odata.config';
import { HttpClient } from '@angular/common/http';
import { ODataService } from './angular-odata.service';

@Injectable({ providedIn: 'root' })
export class ODataFactory {

  constructor(private http: HttpClient, private config: ODataConfig) { }

  public CreateService<T>(resourcePath: string) : ODataService<T> {
    if(!resourcePath)
      throw new Error('The value for parameter \'resourcePath\' is not valid.');
    return new ODataService<T>(this.http, this.config, resourcePath);
  }
}
