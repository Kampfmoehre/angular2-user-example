import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlbumsComponent } from './albums.component';
import { UserdataService } from '../userdata.service';

import { Album } from '../model/album';
import { User } from '../model/user';

import { ActivatedRouteStub } from '../../testing/router-stubs';

class UserdataServiceSpy {
  testAlbum: Album = {
    id: 12,
    title: 'Fancy album'
  };
  testUser: User = {
    name: 'Rob Halford',
    address: null
  };

  getUserAlbums = jasmine.createSpy('getUserAlbums').and.callFake(
    () => Promise
      .resolve(true)
      .then(() => Object.assign({}, [this.testAlbum]))
  )
  getUser = jasmine.createSpy('getUser').and.callFake(
    () => Promise
      .resolve(true)
      .then(() => Object.assign({}, this.testUser))
  )
}

class LocationMock {
  back = jasmine.createSpy('back').and.stub();
}

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;
  let ussSpy: UserdataServiceSpy;
  let activatedRoute: ActivatedRouteStub;
  let location: LocationMock;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParams = {id: 12};

    TestBed.configureTestingModule({
      declarations: [ AlbumsComponent ],
      imports: [ RouterTestingModule ]
    })
    .overrideComponent(AlbumsComponent, {
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
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;

    ussSpy = fixture.debugElement.injector.get(UserdataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`title should contain the name of the user`, () => {
    // First change detection triggers ngOnInit where the user is loaded
    fixture.detectChanges();
    expect(ussSpy.getUser.calls.count()).toBe(1, 'getUser called once');
    fixture.whenStable().then(() => {
      // second change detection after the user is loaded
      fixture.detectChanges();
      expect(component.title).toEqual('Albums of user ' + ussSpy.testUser.name);
    });
  });

  it('should load albums after initialization', async(() => {
    // This calls ngOnInit() on the component fixture
    fixture.detectChanges();
    expect(ussSpy.getUserAlbums.calls.count()).toBe(1, 'getUserAlbums called once');
  }));
});
