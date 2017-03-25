import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from './user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserdataService {
  private dataUrl = 'http://jsonplaceholder.typicode.com';
  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return this.http.get(this.dataUrl + '/users')
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
