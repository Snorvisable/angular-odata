import { IODataQuery, ODataQuery } from './angular-odata.query';
import { ODataConfig } from './angular-odata.config';
import { HttpClient } from '@angular/common/http';

export class ODataService<T> {

  constructor(private http: HttpClient, private config: ODataConfig, private resourcePath: string) { }

  public getSingle(key: string | number) : IODataQuery<T> {
    if(!key)
      throw new Error('The value for parameter \'key\' is not valid.');
    return new ODataQuery(this.http, this.config, this.resourcePath, key);
  }

  public getCollection() : IODataQuery<T[]> {
    return new ODataQuery(this.http, this.config, this.resourcePath);
  }
}
