import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {TaskService} from '../services/task.service';
import { Task } from './task';
import { ParentTask } from './parenttask';
import { Router } from '@angular/router';
 


@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  task: Task = new Task();
  
  constructor(private router: Router,private taskervice: TaskService) {
   }
   

   addTask(): void {
    
    this.task.errorParentTask ='';
    this.task.errorTask ='';
    this.task.errorMessages ='';
     if(!this.error.isError){
             this.taskervice.addTask(this.task)
          .subscribe( data => {
                      
            for (const fieldName of Object.keys(data)) {
              const serverErrors = data[fieldName];
              //alert(fieldName +  data[fieldName]);
             
              if(fieldName =='task'){
                console.log(data[fieldName]);
                this.task.errorTask = data[fieldName];
              }
              if(fieldName =='parentTask'){
              //  console.log(data[fieldName]);
                this.task.errorParentTask = data[fieldName];
              }
              
            }
           
            if(this.task.errorMessages!=""  && this.task.errorTask!="" && this.task.errorParentTask!=""){
          
            this.router.navigate(['viewtask']);
            }else{
              //console.log(this.task.errorMessages +this.task.errorTask+this.task.errorParentTask)
            }
          },
          error => {
            alert("Task created successfully.");
            this.task.errorParentTask ='';
            this.task.errorTask ='';
            this.task.errorMessages ='';
            this.task.task ='';
            this.task.parentTask ='';
            
            this.task.priority =1;
        }
         
        );
     
      }else{
       
      }
  };

  /*addTask(task, parentTask,startDate, endDate) {
    this.taskervice.addTask(task,parentTask,startDate,endDate);
  }*/
  ngOnInit() {
    this.error={};
    
  }
  error:any={isError:false,errorMessage:''};
  
  compareTwoDates(strDate,endDate){
    this.error ={isError:false,errorMessage:''};
     if(new Date(strDate)>new Date(endDate)){
        this.error={isError:true,errorMessage:'End Date cant before start date'};
     }
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
