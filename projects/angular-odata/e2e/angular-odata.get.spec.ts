import { TestBed, async } from "@angular/core/testing";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ODataTestingConfig } from './angular-odata.config';
import { ODataFactory, ODataConfig, ODataService } from '../src/public_api';
import { Person } from './models/people/person';

describe('OData', () => {
  let service: ODataService<Person>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ODataConfig, useClass: ODataTestingConfig },
        HttpClient,
        ODataFactory
      ],
      imports: [
        HttpClientModule
      ]
    });
    const factory = TestBed.get(ODataFactory) as ODataFactory;
    service = factory.CreateService<Person>('People');
  });


  describe('GetSingle', () => {

    it('Should get single person.', async(() => {
      const userName = "georginabarlow";
      service.query().getSingle(userName).subscribe(result => {

        expect(result).toBeTruthy();
        expect(result.UserName).toEqual(userName);
      });
    }));

    it('Should get single person\'s firstName & lastname.', async(() => {
      service.query().select(["FirstName", "LastName"]).getSingle("georginabarlow").subscribe(result => {

        expect(result).toBeTruthy();
        expect(result.UserName).toEqual(undefined);
        expect(result.Age).toEqual(undefined);
        expect(result.Gender).toEqual(undefined);
        expect(result.FirstName).toEqual("Georgina");
        expect(result.LastName).toEqual("Barlow");
      });
    }));
  });


  describe('GetCollection', () => {

    it('Should get all people.', async(() => {
      service.query().getCollection().subscribe(result => {
        // Assert
        expect(result).toBeTruthy();
        expect(result.length).toEqual(20);
        expect(result.every(person => person.Friends === undefined && person.BestFriend === undefined && person.Trips === undefined)).toBeTruthy();
      });

    }));

    it('Should get 5 persons.', async(() => {
      service.query().top(5).getCollection().subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.length).toEqual(5);
      });
    }));

    it('Should get the first person and skip it.', async(() => {
      service.query().top(1).getCollection().subscribe(firstResult => {
        expect(firstResult).toBeTruthy();
        expect(firstResult.length).toEqual(1);
        service.query().skip(1).getCollection().subscribe(result => {
          expect(result).toBeTruthy();
          expect(result.length).toEqual(19);
          expect(result.some(person => person.UserName === firstResult[0].UserName)).toBeFalsy();
        });
      });
    }));
  });
  describe('GetPropertyValue', () => {
    it('Should get the firstName of a person.', async(() => {
      const userName = "georginabarlow";
      service.query().getPropertyValue(userName, "UserName").subscribe(result => {
        expect(result).toBeTruthy();
        expect(result).toEqual(userName);
      });
    }));

    it('Should get the bestFriend of a person.', async(() => {
      service.query().getComplexPropertyValue<Person>("georginabarlow", "BestFriend").subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.UserName).toEqual("angelhuffman");
      });
    }));
  });
});