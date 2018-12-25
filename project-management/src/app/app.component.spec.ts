import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule }          from '@angular/forms';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {TaskPipe} from './viewtask/task.pipe';
import {UserPipe} from './adduser/user.pipe';
import {PorjectPipe} from './addproject/project.pipe';
import { HeaderComponent } from './header/header.component';
import { EdittaskComponent } from './edittask/edittask.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { AdduserComponent } from './adduser/adduser.component';
import {APP_BASE_HREF} from '@angular/common';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AddtaskComponent,
        ViewtaskComponent,
        PageNotFoundComponent,
        TaskPipe,
        UserPipe,
        PorjectPipe,
        HeaderComponent,
        EdittaskComponent,
        AddprojectComponent,
        AdduserComponent
      ],
      imports: [
        FormsModule,
        AppRoutingModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'projectmanager-web'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('projectmanager-web');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to projectmanager-web!');
  // });
});
