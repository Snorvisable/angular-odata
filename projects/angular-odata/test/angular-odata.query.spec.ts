import { TestBed, inject } from "@angular/core/testing";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ODataConfig } from '../src/lib/angular-odata.config';
import { ODataQuery, IODataQuery, ODataOrderDirection } from '../src/lib/angular-odata.query';
import { Observable } from 'rxjs';

class ODataTestingConfig extends ODataConfig {
  constructor() {
    super();
    this.rootURL = 'fake-url';
  }
}

describe('ODataQuery', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: ODataConfig, useClass: ODataTestingConfig },
      HttpClient
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  describe('Expand', () => {
    it('Should throw on invalid properties', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      const expandFn = () => query.expand(null);

      // Assert
      expect(http.get).not.toHaveBeenCalled();
      expect(expandFn).toThrowError('The value for parameter \'properties\' is not valid.');
    }));
    it('Should execute', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.expand(['company', 'address']).execute();

      const params = new HttpParams().append('$expand', 'company, address');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
  });

  describe('Filter', () => {
    it('Should execute \'equal\'', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.equal('name', 'Snorvisable')).execute();

      const params = new HttpParams().append('$filter', 'name eq \'Snorvisable\'');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute \'notEqual\'', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.notEqual('name', 'Snorvisable')).execute();

      const params = new HttpParams().append('$filter', 'name ne \'Snorvisable\'');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute \'greaterThan\'', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.greaterThan('age', 25)).execute();

      const params = new HttpParams().append('$filter', 'age gt 25');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute \'greaterThanOrEqual\'', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.greaterThanOrEqual('age', 25)).execute();

      const params = new HttpParams().append('$filter', 'age ge 25');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute \'lessThan\'', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.lessThan('age', 25)).execute();

      const params = new HttpParams().append('$filter', 'age lt 25');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute \'lessThanOrEqual\'', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.lessThanOrEqual('age', 25)).execute();

      const params = new HttpParams().append('$filter', 'age le 25');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute concatenated \'and\'', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.equal('name', 'Snorvisable').and.greaterThan('age', 25)).execute();

      const params = new HttpParams().append('$filter', 'name eq \'Snorvisable\' and age gt 25');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute concatenated \'or\'', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.equal('name', 'Snorvisable').or.greaterThan('age', 25)).execute();

      const params = new HttpParams().append('$filter', 'name eq \'Snorvisable\' or age gt 25');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
  });

  describe('OrderBy', () => {
    it('Should throw on invalid property', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      const orderByFn = () => query.orderBy(null, ODataOrderDirection.ascending);

      // Assert
      expect(http.get).not.toHaveBeenCalled();
      expect(orderByFn).toThrowError('The value for parameter \'property\' is not valid.');
    }));
    it('Should throw on invalid direction', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      const orderByFn = () => query.orderBy('name', null);

      // Assert
      expect(http.get).not.toHaveBeenCalled();
      expect(orderByFn).toThrowError('The value for parameter \'direction\' is not valid.');
    }));
    it('Should execute ascending', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.orderBy('name', ODataOrderDirection.ascending).execute();

      const params = new HttpParams().append('$orderBy', 'name asc');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute descending', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.orderBy('age', ODataOrderDirection.descending).execute();

      const params = new HttpParams().append('$orderBy', 'age desc');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
  });

  describe('Select', () => {
    it('Should throw on invalid properties', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      const selectFn = () => query.select(null);

      // Assert
      expect(http.get).not.toHaveBeenCalled();
      expect(selectFn).toThrowError('The value for parameter \'properties\' is not valid.');
    }));
    it('Should execute', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.select(['id','name','age']).execute();

      const params = new HttpParams().append('$select', 'id, name, age');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
  });

  describe('Skip', () => {
    it('Should throw on invalid count', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      const selectFn = () => query.skip(null);

      // Assert
      expect(http.get).not.toHaveBeenCalled();
      expect(selectFn).toThrowError('The value for parameter \'count\' is not valid.');
    }));
    it('Should execute', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.skip(66).execute();

      const params = new HttpParams().append('$skip', '66');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
  });

  describe('Top', () => {
    it('Should throw on invalid count', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      const selectFn = () => query.top(null);

      // Assert
      expect(http.get).not.toHaveBeenCalled();
      expect(selectFn).toThrowError('The value for parameter \'count\' is not valid.');
    }));
    it('Should execute', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      const query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.top(33).execute();

      const params = new HttpParams().append('$top', '33');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
  });
});
