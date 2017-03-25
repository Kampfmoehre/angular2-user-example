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
  title = 'Photos View';
  photos: Photo[];

  constructor(private userdataService: UserdataService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userdataService.getUserPhotos(+params['albumid']))
      .subscribe(photos => this.photos = photos);
  }

  goBack(): void {
    this.location.back();
  }

}
