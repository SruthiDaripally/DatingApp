import { Route } from '@angular/compiler/src/core';

import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListsComponent } from './members/member-lists/member-lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes-guard';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MemberDetailResolver } from './_resolvers/memer-detail.resolver';
import { MemberEditResolver } from './_resolvers/memer-edit.resolver';
import { MemberListResolver } from './_resolvers/memer-list.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';


export const appRoutes: Routes = [
{path: '', component: HomeComponent},
{
   path: '',
   runGuardsAndResolvers: 'always',
   canActivate  : [AuthGuard],
   children: [
    {path: 'members', component: MemberListsComponent , resolve: {users : MemberListResolver}},
    {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
    {path: 'member/edit', component: MemberEditComponent , resolve: {user: MemberEditResolver},
  canDeactivate: [PreventUnsavedChanges]},
    {path: 'lists', component: ListsComponent , resolve : {users: ListsResolver}},
    {path: 'messages', component: MessagesComponent , resolve : {messages: MessagesResolver}},
  ]
},
{path: '**', redirectTo: '' , pathMatch : 'full'}

];

