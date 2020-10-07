import { Route } from '@angular/compiler/src/core';

import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListsComponent } from './members/member-lists/member-lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailResolver } from './_resolvers/memer-detail.resolver';
import { MemberListResolver } from './_resolvers/memer-list.resolver';


export const appRoutes: Routes = [
{path: '', component: HomeComponent},
{
   path: '',
   runGuardsAndResolvers: 'always',
   canActivate  : [AuthGuard],
   children: [
    {path: 'members', component: MemberListsComponent , resolve: {users : MemberListResolver}},
    {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
    {path: 'lists', component: ListsComponent},
    {path: 'messages', component: MessagesComponent},
  ]
},
{path: '**', redirectTo: '' , pathMatch : 'full'}

];

