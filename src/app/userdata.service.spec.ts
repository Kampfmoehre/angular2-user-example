import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { UserdataService } from './userdata.service';

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
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify([{ name: 'Bruce' }])
      });
      connection.mockRespond(new Response(options));
    });

    userdataService
      .getUsers()
      .then((response) => {
        expect(response).toEqual([{ Name: 'Bruce' }]);
      });
  })));
});
