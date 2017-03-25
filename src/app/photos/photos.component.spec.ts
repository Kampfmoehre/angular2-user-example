import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosComponent } from './photos.component';
import { UserdataService } from '../userdata.service';

import { Album } from '../model/album';
import { Photo } from '../model/photo';

import { ActivatedRouteStub } from '../../testing/router-stubs';

class UserdataServiceSpy {
  testPhoto: Photo = {
    id: 12,
    title: 'Fancy album',
    thumbnailUrl: '',
    url: ''
  };
  testAlbum: Album = {
    id: 12,
    title: 'Panorama'
  };

  getUserPhotos = jasmine.createSpy('getUserPhotos').and.callFake(
    () => Promise
      .resolve(true)
      .then(() => Object.assign({}, [this.testPhoto]))
  )

  getAlbum = jasmine.createSpy('getAlbum').and.callFake(
    () => Promise
      .resolve(true)
      .then(() => Object.assign({}, [this.testAlbum]))
  )
}

class LocationMock {
  back = jasmine.createSpy('back').and.stub();
}

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let ussSpy: UserdataServiceSpy;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParams = {id: 15};

    TestBed.configureTestingModule({
      declarations: [ PhotosComponent ]
    })
    .overrideComponent(PhotosComponent, {
      set: {
        providers: [
          { provide: UserdataService, useClass: UserdataServiceSpy },
          { provide: ActivatedRoute, useValue: activatedRoute },
          { provide: Location, useClass: LocationMock }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;

    ussSpy = fixture.debugElement.injector.get(UserdataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should contain the name of the album', () => {
    // First change detection triggers ngOnInit where the user is loaded
    fixture.detectChanges();
    expect(ussSpy.getAlbum.calls.count()).toBe(1, 'getAlbum called once');

    fixture.whenStable().then(() => {
      // second change detection after the user is loaded
      fixture.detectChanges();
      expect(component.title).toEqual('Photos of album "' + ussSpy.testAlbum.title + '"');
    });
  });

  it('should load photos after initialization', async(() => {
    // This calls ngOnInit() on the component fixture
    fixture.detectChanges();
    expect(ussSpy.getUserPhotos.calls.count()).toBe(1, 'getUserPhotos called once');
  }));
});
