import { TestBed, inject } from "@angular/core/testing";
import { ODataFactory } from '../src/lib/angular-odata.factory';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ODataConfig } from '../src/lib/angular-odata.config';
import { ODataClient } from '../src/lib/angular-odata.client';

describe('ODataFactory', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ODataConfig,
      ODataFactory,
      HttpClient,
      ODataClient
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  describe('ODataFactory', () => {
    it('Should throw on invalid resourcePath', inject([ODataFactory], (factory: ODataFactory) => {
      // Act
      const createServiceFn = () => factory.CreateService(null);

      // Assert
      expect(createServiceFn).toThrowError('The value for parameter \'resourcePath\' is not valid.');
    }));

    it('Should create ODataService', inject([ODataFactory], (factory: ODataFactory) => {
      // Act
      const service = factory.CreateService('test');

      // Assert
      expect(service).toBeTruthy();
    }));
  });
});
