# AngularOdata

This library exposes a service for easy communication with OData endpoints. Use it to retrieve and manipulate data through OData endpoints.


# Quick set-up
1. Add @snorvisable/angular-odata to the dependencies in the project.json file.
`"@snorvisable/angular-odata": "0.2.2"`
2. Import the `AngularODataModule` in app.module.ts.
3. Create a new class extending `ODataConfig` and add it to the providers. Replace rootUrl with the root url of the API you'd like to query:
```javascript
export class MyODataConfig extends ODataConfig {
  rootURL = 'https://services.odata.org/TripPinRESTierService';
}
```

```javascript
providers: [
    { provide: ODataConfig, useClass: MyODataConfig }
  ],
imports: [
    AngularODataModule
  ]
```


# Usage example
```javascript
export class AppComponent implements OnInit {
  title = 'My Awesome App';
constructor(private factory: ODataFactory) {

}

  ngOnInit(): void {
    // Create a service with the injected factory.
    const artistsService = this.factory.CreateService<Artist>("artists");
    
    // Retrieve all artists and log the artists to the console.
    artistsService.query().getCollection().subscribe(artists => console.log(artists));
  }
}
```


Visit the [wiki](https://github.com/Snorvisable/angular-odata/wiki) if you want to know more.
