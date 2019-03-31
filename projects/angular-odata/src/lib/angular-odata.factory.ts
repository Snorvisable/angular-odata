import { Injectable } from '@angular/core';
import { ODataConfig } from './angular-odata.config';
import { ODataService } from './angular-odata.service';
import { ODataClient } from './angular-odata.client';

@Injectable()
export class ODataFactory {

  constructor(private client: ODataClient, private config: ODataConfig) { }

  public CreateService<T>(resourcePath: string): ODataService<T> {
    if (!resourcePath)
      throw new Error('The value for parameter \'resourcePath\' is not valid.');
    return new ODataService<T>(this.client, this.config, resourcePath);
  }
}
