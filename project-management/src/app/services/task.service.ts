import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Task } from '../addtask/task';
import { User } from '../addUser/user';
import {ParentTask} from '../addtask/parenttask';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TaskService {
   //private userUrl = 'http://localhost:8080/user-portal/user';
  private userUrl = 'http://localhost:7070';
  constructor(private http: HttpClient) { }

  public addUser(user){
    return this.http.post<User>(this.userUrl+'/addUser', user);
  }
  public getAllUsers() {
    return this.http.get<User[]>(this.userUrl+'/getAllUsers');
  }

  public addTask(task) {
    return this.http.post<Task>(this.userUrl+'/task', task);
  }

  public viewTask() {
    return this.http.get<Task[]>(this.userUrl+'/tasks');
  }

  public getTasksByProjectId(projectId) {
    return this.http.get<Task[]>(this.userUrl+'/tasksByProject/'+projectId);
  }

  public updateTask(task,taskId){
    return this.http.post<Task>(this.userUrl+'/editTask/',task);
  }
  public getAllParentTasks() {
    return this.http.get<ParentTask[]>(this.userUrl+'/getParentTask');
  }
  public endTask(task,taskId){
    console.log(taskId);
    
    return this.http.delete<Task[]>(this.userUrl+'/endTask/'+taskId);
  }
  /* addTask(task, parentTask,startDate,endDate) {
    const uri = 'http://localhost:4000/task/add';
    const obj = {
      task: name,
      parentTask: parentTask,
      startDate:startDate,
      endDate:endDate

    };
    this.http.post(uri, obj)
        .subscribe(res => console.log('Done'));
  } */
}