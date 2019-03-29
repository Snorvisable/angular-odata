import { IODataQuery, ODataQuery } from './angular-odata.query';
import { ODataConfig } from './angular-odata.config';
import { ODataClient, ODataReturnModification } from './angular-odata.client';
import { Observable } from 'rxjs';

export class ODataService<T> {

  constructor(private client: ODataClient, private config: ODataConfig, private resourcePath: string) { }

  public query() : IODataQuery<T> {
    return new ODataQuery<T>(this.client, this.config, this.resourcePath);
  }

  public post(entity: T, returnModification: ODataReturnModification = ODataReturnModification.default): Observable<T> {
    return this.client.post<T>(this.config, this.resourcePath, entity, returnModification);
  }

  public patch(entity: T, key: string | number, returnModification: ODataReturnModification = ODataReturnModification.default): Observable<T> {
    return this.client.patch<T>(this.config, this.resourcePath, key, entity, returnModification);
  }

  public put(entity: T, key: string | number, returnModification : ODataReturnModification = ODataReturnModification.default): Observable<T> {
    return this.client.put<T>(this.config, this.resourcePath, key, entity, returnModification);
  }

  public delete(key: string | number): Observable<Object> {
    return this.client.delete(this.config, this.resourcePath, key);
  }
}
