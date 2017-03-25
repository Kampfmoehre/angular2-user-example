import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User } from '../user';
import { UsersComponent } from './users.component';
import { UserdataService } from '../userdata.service';

class UserdataServiceSpy {
  testUsers: User[] = [{name: 'Dickinson, Bruce'}];

  getUsers = jasmine.createSpy('getUsers').and.callFake(
    () => Promise
      .resolve(true)
      .then(() => Object.assign({}, this.testUsers))
  )
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let ussSpy: UserdataServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ]
    })
    .overrideComponent(UsersComponent, {
      set: {
        providers: [
          {provide: UserdataService, useClass: UserdataServiceSpy }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;

    ussSpy = fixture.debugElement.injector.get(UserdataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Users View'`, () => {
    fixture.detectChanges();
    expect(component.title).toEqual('Users View');
  });

  it('should render title in a h2 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Users View');
  }));

  it('should load users after initialization', async(() => {
    // This calls ngOnInit() on the component fixture
    fixture.detectChanges();
    expect(ussSpy.getUsers.calls.count()).toBe(1, 'getUsers called once');
  }));
});
