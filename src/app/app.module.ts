import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserdataService } from './userdata.service';
import { AlbumsComponent } from './albums/albums.component';
import { PhotosComponent } from './photos/photos.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AlbumsComponent,
    PhotosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
        {
            path: 'users',
            component: UsersComponent
        }, {
            path: 'users/:userid/albums',
            component: AlbumsComponent
        }, {
            path: 'albums/:albumid/photos',
            component: PhotosComponent
        }
    ])
  ],
  providers: [ UserdataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
