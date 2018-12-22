import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Task } from '../addtask/task';
import { User } from '../addUser/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProjectService {

    private userUrl = 'http://localhost:7070';
    constructor(private http: HttpClient) { }
  
    public addProject(user){
      return this.http.post<User>(this.userUrl+'/createProject', user);
    }

    public getAllProjects() {
        return this.http.get<User[]>(this.userUrl+'/getAllProjects');
      }

}