import { TestBed, inject } from "@angular/core/testing";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ODataConfig } from '../src/lib/angular-odata.config';
import { ODataQuery, IODataQuery } from '../src/lib/angular-odata.query';
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
    it('Should execute expand', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      let query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
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
    it('Should execute \'equal\' filter', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      let query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.equal('name', 'Snorvisable')).execute();

      const params = new HttpParams().append('$filter', 'name eq \'Snorvisable\'');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute \'notEqual\' filter', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      let query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.notEqual('name', 'Snorvisable')).execute();

      const params = new HttpParams().append('$filter', 'name ne \'Snorvisable\'');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute \'greaterThan\' filter', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      let query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.greaterThan('age', 25)).execute();

      const params = new HttpParams().append('$filter', 'age gt 25');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute \'greaterThanOrEqual\' filter', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      let query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.greaterThanOrEqual('age', 25)).execute();

      const params = new HttpParams().append('$filter', 'age ge 25');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute \'lessThan\' filter', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      let query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.lessThan('age', 25)).execute();

      const params = new HttpParams().append('$filter', 'age lt 25');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute \'lessThanOrEqual\' filter', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      let query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.lessThanOrEqual('age', 25)).execute();

      const params = new HttpParams().append('$filter', 'age le 25');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
    it('Should execute concatenated \'and\' filter', inject([HttpClient, ODataConfig], (http: HttpClient, config: ODataConfig) => {
      // Assign
      let query: IODataQuery<{}> = new ODataQuery(http, config, 'resource');
      spyOn(http, 'get').and.returnValue(new Observable<Response>());

      // Act
      query.filter(f => f.equal('name', 'Snorvisable').and.greaterThan('age', 25)).execute();

      const params = new HttpParams().append('$filter', 'name eq \'Snorvisable\' and age gt 25');
      const options: { params: HttpParams; } = { params: params };

      // Assert
      expect(query).toBeTruthy();
      expect(http.get).toHaveBeenCalledWith('fake-url/resource', options);
    }));
  });
});
