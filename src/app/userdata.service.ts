import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Album } from './model/album';
import { Photo } from './model/photo';
import { User } from './model/user';

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

  getUserAlbums(userId: number): Promise<Album[]> {
    return this.http.get(this.dataUrl + '/albums?userId=' + userId)
      .toPromise()
      .then(response => response.json() as Album[])
      .catch(this.handleError);
  }

  getUserPhotos(albumId: number): Promise<Photo[]> {
    return this.http.get(this.dataUrl + '/photos?albumId=' + albumId)
      .toPromise()
      .then(response => response.json() as Photo[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
