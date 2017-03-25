import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosComponent } from './photos.component';
import { UserdataService } from '../userdata.service';

import { Photo } from '../model/photo';

import { ActivatedRouteStub } from '../../testing/router-stubs';

class UserdataServiceSpy {
  testPhoto: Photo = {
    id: 12,
    title: 'Fancy album',
    thumbnailUrl: '',
    url: ''
  };

  getUserPhotos = jasmine.createSpy('getUserPhotos').and.callFake(
    () => Promise
      .resolve(true)
      .then(() => Object.assign({}, [this.testPhoto]))
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
  let location: LocationMock;

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

  it(`should have as title 'Photos View'`, () => {
    fixture.detectChanges();
    expect(component.title).toEqual('Photos View');
  });

  it('should render title in a h2 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Photos View');
  }));

  it('should load photos after initialization', async(() => {
    // This calls ngOnInit() on the component fixture
    fixture.detectChanges();
    expect(ussSpy.getUserPhotos.calls.count()).toBe(1, 'getUserPhotos called once');
  }));
});
