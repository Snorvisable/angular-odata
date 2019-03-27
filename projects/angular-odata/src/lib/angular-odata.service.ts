import { IODataQuery, ODataQuery } from './angular-odata.query';
import { ODataConfig } from './angular-odata.config';
import { ODataClient } from './angular-odata.client';

export class ODataService<T> {

  constructor(private client: ODataClient, private config: ODataConfig, private resourcePath: string) { }

  public query() : IODataQuery<T> {
    return new ODataQuery<T>(this.client, this.config, this.resourcePath);
  }

  public Post(entity: T): T {
    return null;
  }

  public Patch(entity: T, key: string | number): T {
    return null;
  }

  public Put(entity: T, key: string | number): T {
    return null;
  }

  public Delete(key: string | number): T {
    return null;
  }
}
