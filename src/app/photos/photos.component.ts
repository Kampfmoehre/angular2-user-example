import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { UserdataService } from '../userdata.service';
import { Photo } from '../model/photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  title: string;
  photos: Photo[];

  constructor(private userdataService: UserdataService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userdataService.getUserPhotos(+params['albumid']))
      .subscribe(photos => this.photos = photos);
    this.route.params
      .switchMap((params: Params) => this.userdataService.getAlbum(+params['albumid']))
      .subscribe(album => this.title = 'Photos of album "' + album.title + '"');
  }

  goBack(): void {
    this.location.back();
  }

}
