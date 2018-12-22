import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import {UpdateComponent} from './update/update.component';
import { AdduserComponent } from './adduser/adduser.component';
import {ProjectComponent} from './project/project.component';
const appRoutes: Routes = [
  { path: 'addUser', component: AdduserComponent },
  { path: 'addProject', component: ProjectComponent },
  { path: 'addTask', component: AddtaskComponent },
  { path: '',   redirectTo: '/addUser', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
   
})
export class AppRoutingModule { }


 
