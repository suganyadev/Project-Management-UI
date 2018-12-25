import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Task } from '../addtask/task';
import { User } from '../addUser/user';
import { Project } from '../project/project';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProjectService {

    private userUrl = 'http://localhost:7070';
    constructor(private http: HttpClient) { }
  
    public createProject(project){
      return this.http.post<Project>(this.userUrl+'/createProject', project);
    }

    public getAllProjects() {
        return this.http.get<Project[]>(this.userUrl+'/getAllProjects');
      }

}