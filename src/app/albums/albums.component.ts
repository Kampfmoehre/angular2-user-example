import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { UserdataService } from '../userdata.service';
import { Album } from '../model/album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  title = 'Albums View';
  albums: Album[];

  constructor(private userdataService: UserdataService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userdataService.getUserAlbums(+params['userid']))
      .subscribe(albums => this.albums = albums);
  }

  goBack(): void {
    this.location.back();
  }
}
