import { Component, OnInit } from '@angular/core';
import {TaskService} from '../services/task.service';
import { EditTaskService } from '../services/edittask.service';
import { TaskVO } from '../addtask/taskVO';
import { Router } from '@angular/router';
import {ProjectService} from '../services/project.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  task: TaskVO = new TaskVO();
  projectsList : any = [];
  usersList : any = [];
  parentsList : any = [];
  tempParentsList : any = [];
  projectName:String='';
  userName:String='';
  parentTaskName:String='';
  modalHeading:String = '';
  modalBody:String ='';
  checkBoxSelect: boolean;
  //editTask: any= {};
  constructor(private router: Router,private userService: UserService,private projectService: ProjectService,private taskService: TaskService, private staticTaskService: EditTaskService) {
    
    userService.getAllUsers().subscribe((data :any) => {
      this.usersList = data;
      for ( var i = 0; i < this.usersList.length; i++)
      {
        if(this.usersList[i].employeeId !== null && this.usersList[i].employeeId === this.task.employeeId){
          this.userName=this.usersList[i].lastName + ', ' + this.usersList[i].firstName;
        }
      }
    });
    taskService.getAllParentTasks().subscribe((data :any) => {
      this.parentsList = data;
      this.tempParentsList=data;
      console.log( this.task.employeeId);
      console.log(this.task.parentTaskId);
      console.log(this.parentsList.length);
      for ( var i = 0; i < this.parentsList.length; i++)
      {
        console.log(this.task.parentTaskId);
        if(this.parentsList[i].parentTaskId !== null && this.parentsList[i].parentTaskId === this.task.parentTaskId){
          this.parentTaskName=this.parentsList[i].parentTaskName;
        }
      }
      console.log(this.parentTaskName);
    });
   
  }

  ngOnInit() {
    this.task = this.staticTaskService.editTask;
    console.log(this.task);
    if(this.task.parentTaskInd){
      this.checkBoxSelect=true;
    } else{
      this.checkBoxSelect=false;
    }   
    console.log(this.task.startDate);
    console.log(this.task.endDate);
    // = new Date();
  //  this.task.endDate = new Date();
    
  }

  getProjectPopup(){
    this.projectService.getAllProjects().subscribe((data :any) => {
      this.projectsList = data;
     });
    console.log(this.projectsList);
    if(this.projectsList.length ===0){
      this.modalHeading = 'Error!!!';
      this.modalBody = 'No Project found. Please try again.';
      document.getElementById("submitModalhide").click();  
    
    }else{
    document.getElementById("projectModalhide").click();
    }
 }

  updateTask(): void {
    console.log(this.task);
    if(this.task.taskName !== '' ){
      this.taskService.updateTask(this.task,this.task.taskId)
      .subscribe( (data: any) => {
        if(data){
          this.modalHeading = 'Note:';
          this.modalBody = 'Task saved Successfully'
          document.getElementById("submitModalhide").click();  
          this.ngOnInit();
        }
      }); 
    }else{
      console.log('submitModal');
      this.modalHeading = 'Alert';
      this.modalBody = 'Please fill all required values';
      document.getElementById("submitModalhide").click(); 
    }
  }


getParentPopup(){
  
  this.taskService.getAllParentTasks().subscribe((data :any) => {
    this.parentsList = data;
  });
  /* for ( var i = 0; i < this.tempParentsList.length; i++)
  {
    if(this.tempParentsList[i].parentTask.toLowerCase().indexOf(this.parentTaskName.toLowerCase()) > -1){
      this.parentsList.push(this.tempParentsList[i]);
    }
  } */
  if(this.parentsList.length ===0){
    this.modalHeading = 'Error!!!';
    this.modalBody = 'No Parent Task found. Please try again.';
    document.getElementById("submitModalhide").click();  
  
  }else{
  document.getElementById("parentModalhide").click();
}
}

getUserPopup(){
 
  this.userService.getAllUsers().subscribe((data :any) => {
    this.usersList = data;
     });

   if(this.usersList.length ===0){
    this.modalHeading = 'Error!!!';
    this.modalBody = 'No user found. Please try again.';
    document.getElementById("submitModalhide").click();  
  
  }else{
  document.getElementById("userModalhide").click();
}
}

  selectedParent(parent : any){
      console.log(parent.parentTask);
      this.parentTaskName=parent.parentTask;
      this.task.parentTaskId=parent.parentId;
      this.task.parentTaskName=parent.parentTask;
      document.getElementById("parentModalClose").click();
    }

    selectedProject(item : any){
      console.log(item);
      var projectId=item.projectId;
      console.log(projectId);
      this.projectName=item.project;
      this.task.projectId=item.projectId;
      this.task.projectName=item.project;
      document.getElementById("projectModalClose").click();
    }

    selectedUser(user : any){
      this.userName = user.firstName+' '+user.lastName;
      this.task.employeeId=user.employeeId;
      this.task.userId = user.userId;
      this.task.firstName = user.firstName;
      this.task.lastName = user.lastName;
     // console.log("Proj from User"+user.projectId );
      //this.task.projectId = user.projectId;
      document.getElementById("userModalClose").click();
      
    
    }

}
