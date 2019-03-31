import { TestBed, inject } from "@angular/core/testing";
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ODataConfig } from '../src/lib/angular-odata.config';
import { ODataQuery, IODataQuery, ODataOrderDirection } from '../src/lib/angular-odata.query';
import { Observable } from 'rxjs';
import { ODataClient } from '../src/lib/angular-odata.client';

class ODataTestingConfig extends ODataConfig {
  rootURL = 'fake-url';
}

describe('ODataQuery', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: ODataConfig, useClass: ODataTestingConfig },
      HttpClient,
      ODataClient
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  describe('Expand', () => {
    it('Should throw on invalid properties', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      const expandFn = () => query.expand(null);

      // Assert
      expect(client.get).not.toHaveBeenCalled();
      expect(expandFn).toThrowError('The value for parameter \'properties\' is not valid.');
    }));
    it('Should execute', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.expand(['company', 'address']).getCollection();

      const params = new HttpParams().append('$expand', 'company, address');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
  });

  describe('Filter', () => {
    it('Should execute \'equal\'', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.equal('name', 'Snorvisable')).getCollection();

      const params = new HttpParams().append('$filter', 'name eq \'Snorvisable\'');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
    it('Should execute \'notEqual\'', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.notEqual('name', 'Snorvisable')).getCollection();

      const params = new HttpParams().append('$filter', 'name ne \'Snorvisable\'');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
    it('Should execute \'greaterThan\'', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.greaterThan('age', 25)).getCollection();

      const params = new HttpParams().append('$filter', 'age gt 25');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
    it('Should execute \'greaterThanOrEqual\'', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.greaterThanOrEqual('age', 25)).getCollection();

      const params = new HttpParams().append('$filter', 'age ge 25');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
    it('Should execute \'lessThan\'', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.lessThan('age', 25)).getCollection();

      const params = new HttpParams().append('$filter', 'age lt 25');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
    it('Should execute \'lessThanOrEqual\'', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.lessThanOrEqual('age', 25)).getCollection();

      const params = new HttpParams().append('$filter', 'age le 25');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
    it('Should execute concatenated \'and\'', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.equal('name', 'Snorvisable').and.greaterThan('age', 25)).getCollection();

      const params = new HttpParams().append('$filter', 'name eq \'Snorvisable\' and age gt 25');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
    it('Should execute concatenated \'or\'', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.equal('name', 'Snorvisable').or.greaterThan('age', 25)).getCollection();

      const params = new HttpParams().append('$filter', 'name eq \'Snorvisable\' or age gt 25');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
    it('Should execute custom filter', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter('name eq \'Snorvisable\' and age gt 24').getCollection();

      const params = new HttpParams().append('$filter', 'name eq \'Snorvisable\' and age gt 24');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
  });

  describe('OrderBy', () => {
    it('Should throw on invalid property', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      const orderByFn = () => query.orderBy(null, ODataOrderDirection.ascending);

      // Assert
      expect(client.get).not.toHaveBeenCalled();
      expect(orderByFn).toThrowError('The value for parameter \'property\' is not valid.');
    }));
    it('Should throw on invalid direction', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      const orderByFn = () => query.orderBy('name', null);

      // Assert
      expect(client.get).not.toHaveBeenCalled();
      expect(orderByFn).toThrowError('The value for parameter \'direction\' is not valid.');
    }));
    it('Should execute ascending', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.orderBy('name', ODataOrderDirection.ascending).getCollection();

      const params = new HttpParams().append('$orderBy', 'name asc');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
    it('Should execute descending', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.orderBy('age', ODataOrderDirection.descending).getCollection();

      const params = new HttpParams().append('$orderBy', 'age desc');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
  });

  describe('Select', () => {
    it('Should throw on invalid properties', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      const selectFn = () => query.select(null);

      // Assert
      expect(client.get).not.toHaveBeenCalled();
      expect(selectFn).toThrowError('The value for parameter \'properties\' is not valid.');
    }));
    it('Should execute', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.select(['id', 'name', 'age']).getCollection();

      const params = new HttpParams().append('$select', 'id, name, age');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
  });

  describe('Skip', () => {
    it('Should throw on invalid count', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      const selectFn = () => query.skip(null);

      // Assert
      expect(client.get).not.toHaveBeenCalled();
      expect(selectFn).toThrowError('The value for parameter \'count\' is not valid.');
    }));
    it('Should execute', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.skip(66).getCollection();

      const params = new HttpParams().append('$skip', '66');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
  });

  describe('Top', () => {
    it('Should throw on invalid count', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      const selectFn = () => query.top(null);

      // Assert
      expect(client.get).not.toHaveBeenCalled();
      expect(selectFn).toThrowError('The value for parameter \'count\' is not valid.');
    }));
    it('Should execute', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(client, config, 'resource');
      spyOn(client, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.top(33).getCollection();

      const params = new HttpParams().append('$top', '33');

      // Assert
      expect(query).toBeTruthy();
      expect(client.get).toHaveBeenCalledWith(config, 'resource', undefined, undefined, params);
    }));
  });
});
