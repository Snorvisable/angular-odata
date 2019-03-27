import { TestBed, inject } from "@angular/core/testing";
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ODataConfig } from '../src/lib/angular-odata.config';
import { ODataService } from '../src/lib/angular-odata.service';
import { ODataClient } from '../src/lib/angular-odata.client';

describe('ODataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ODataConfig,
      HttpClient,
      ODataClient
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  describe('GetCollection', () => {
    it('Should return ODataQuery', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const service = new ODataService(client, config, 'resource');

      // Act
      const query = service.getCollection();

      // Assert
      expect(query).toBeTruthy();
    }));
  });

  describe('GetSingle', () => {
    it('Should throw on invalid key', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const service = new ODataService(client, config, 'resource');

      // Act
      const getSingleFn = () => service.getSingle(null);

      // Assert
      expect(getSingleFn).toThrowError('The value for parameter \'key\' is not valid.');
    }));

    it('Should return ODataQuery', inject([ODataClient, ODataConfig], (client: ODataClient, config: ODataConfig) => {
      // Assign
      const service = new ODataService(client, config, 'resource');

      // Act
      const query = service.getSingle(1);

      // Assert
      expect(query).toBeTruthy();
    }));
  });
});
