import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DatePipe } from '@angular/common'
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TaskService } from './services/task.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TaskPipe} from './viewtask/task.pipe';
import {SearchPipe} from './services/search.pipe';
import { UpdateComponent } from './update/update.component';
import { AdduserComponent } from './adduser/adduser.component';
import {UserPipe} from './adduser/user.pipe';
import { ProjectComponent } from './project/project.component';
import {ProjectService} from './services/project.service';
import {UserService} from './services/user.service';
import {ProjectPipe} from './project/project.pipe';
import {NgbdModalFocus} from './project/model.focus';
@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    ViewtaskComponent,
    PageNotFoundComponent,
    TaskPipe,
    SearchPipe,
    UpdateComponent,
    AdduserComponent,
    UserPipe,
    ProjectComponent,
    ProjectPipe,
    NgbdModalFocus
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
    
  ],
  exports:[TaskPipe,SearchPipe,UserPipe,ProjectPipe],
  providers: [TaskService,ProjectService,UserService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
