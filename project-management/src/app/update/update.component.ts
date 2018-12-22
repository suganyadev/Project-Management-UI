import { Component, OnInit } from '@angular/core';
import {Task} from '../addtask/task';
import {TaskService} from '../services/task.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
task:Task=new Task();
  constructor(private router: Router,private taskervice: TaskService) { }

  updateTask(task,taskId): void {
    this.taskervice.updateTask(task,taskId)
        .subscribe( data => {
          console.log("in here");
        },
        error => {
       });
  console.log("out");
  this.navigateToView();
  };
navigateToView(){
  console.log("in hdddere");
  this.router.navigate(['viewtask']);
}
  ngOnInit() {
    this.task = this.taskervice.editTask;
  }

}
