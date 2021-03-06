import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { UserdataService } from '../userdata.service';
import { Album } from '../model/album';
import { User } from '../model/user';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  title: string;
  albums: Album[];

  constructor(private userdataService: UserdataService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userdataService.getUserAlbums(+params['userid']))
      .subscribe(albums => this.albums = albums);
    this.route.params
      .switchMap((params: Params) => this.userdataService.getUser(+params['userid']))
      .subscribe(user => this.title = 'Albums of user ' + user.name);
  }

  goBack(): void {
    this.location.back();
  }
}
