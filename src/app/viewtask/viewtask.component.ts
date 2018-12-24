import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import {TaskService} from '../services/task.service';
import { Task } from '../addtask/task';
import { Router } from '@angular/router';
// MDB Angular Free
import { WavesModule } from 'angular-bootstrap-md';
import {SearchCriteria} from '../services/search.criteria';
import {AppRoutingModule} from '../app-routing.module'

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
 
export class ViewtaskComponent implements OnInit{
 

  task: Task = new Task();
  taskList: any[] = [];
  searchCriteria:SearchCriteria = new SearchCriteria();
  constructor(private router: Router,private taskervice: TaskService) {
  }
   

  viewTask(): void {
   this.taskervice.viewTask()
       .subscribe( data => {
         this.taskList = data;
       },
       error => {
       // alert("ERROR");
      });


 };

editTask(task){
  this.taskervice.editTask = task;
  this.router.navigateByUrl('updateTask');
};
 
endTask(taskId){
  this.taskervice.endTask(taskId)
  .subscribe( data => { console.log(data);
    this.taskList = data;
  },
  error => {
  // alert("ERROR");
 });


};
 /*addTask(task, parentTask,startDate, endDate) {
   this.taskervice.addTask(task,parentTask,startDate,endDate);
 }*/
 ngOnInit() {
  this.viewTask();
 }


}
