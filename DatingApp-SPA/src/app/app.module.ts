import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule} from 'ngx-bootstrap/tabs';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
// import { TimeAgoPipe } from 'time-ago-pipe';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/Auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberListsComponent } from './members/member-lists/member-lists.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/memer-detail.resolver';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';
import { MemberListResolver } from './_resolvers/memer-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/memer-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes-guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { ChangeTextDirective } from './change-text.directive';
import { from } from 'rxjs';



export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListsComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      ChangeTextDirective,
      // TimeAgoPipe
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth']
      },
    }),
    FileUploadModule
  ],
  providers: [
     AuthService,
     ErrorInterceptorProvider,
     MemberDetailResolver,
     AlertifyService,
     UserService,
     MemberListResolver,
     MemberEditResolver,
     PreventUnsavedChanges
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
