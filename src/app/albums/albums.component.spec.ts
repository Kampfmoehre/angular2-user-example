import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlbumsComponent } from './albums.component';
import { UserdataService } from '../userdata.service';

import { Album } from '../model/album';

import { ActivatedRouteStub } from '../../testing/router-stubs';

class UserdataServiceSpy {
  testAlbum: Album = {
    id: 12,
    title: 'Fancy album'
  };

  getUserAlbums = jasmine.createSpy('getUserAlbums').and.callFake(
    () => Promise
      .resolve(true)
      .then(() => Object.assign({}, [this.testAlbum]))
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

  it(`should have as title 'Users View'`, () => {
    fixture.detectChanges();
    expect(component.title).toEqual('Albums View');
  });

  it('should render title in a h2 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Albums View');
  }));

  it('should load albums after initialization', async(() => {
    // This calls ngOnInit() on the component fixture
    fixture.detectChanges();
    expect(ussSpy.getUserAlbums.calls.count()).toBe(1, 'getUserAlbums called once');
  }));
});
