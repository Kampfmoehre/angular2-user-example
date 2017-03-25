import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { UserdataService } from './userdata.service';
import { User } from './user';

describe('UserdataService', () => {
  let subject: UserdataService = null;
  let backend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserdataService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  it('should create', inject([UserdataService], (service: UserdataService) => {
    expect(service).toBeTruthy();
  }));

  it('getUsers should call endpoint and return users', (inject([UserdataService, MockBackend], (userdataService: UserdataService, backend: MockBackend) => {

    let user1 = {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify([user1])
      });
      connection.mockRespond(new Response(options));
    });

    userdataService
      .getUsers()
      .then((response) => {
        console.log(response);
        expect(response).toEqual([user1]);
      });
  })));
});
