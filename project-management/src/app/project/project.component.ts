import { Component, OnInit } from '@angular/core';
import { User } from '../adduser/user';
import { Project } from './project';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
 

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  hasSetDefaultDate:boolean;

  project : any = {};
  user : any = {};
  projectsList : any = [];
  intermittentProjectList : any = [];
  userList : any = [];
  intermittentUserList : any = [];
  popUpHeader : string = 'Select the manager';
  popUpContent : string = '';
  searchText:string ='';

  constructor(private router: Router,private projectService: ProjectService,private userService: UserService) {
    this.project = {
      "projectId":"",
      "project":"",
      "priority":"1",
      "employeeName":"",
      "employeeId":""
    };

    userService.getAllUsers().subscribe((data :any) => {
      console.log("cd");
      this.userList = data;
      this.intermittentUserList=data;
    });
    projectService.getAllProjects().subscribe((data :any) => {
      console.log("cdd")+data;
      this.projectsList = data;
      this.intermittentProjectList = data;
    });

   }
   addProject():void{
    console.log(this.project);
    this.project.status='In-Progress';
   
    if(this.project.projectName != '' && this.project.employeeName !='' && this.project.employeeId!=''){
      this.projectService.addProject(this.project)
        .subscribe( (data: any) => {
          if(data){
            this.popUpHeader = 'Note:';
            this.popUpContent = 'User saved Successfully'
            document.getElementById("popUpBtn").click();  
            document.getElementById("reset").click();  
            this.ngOnInit();
          }
          else{
            this.popUpHeader = 'Error!!!';
            this.popUpContent = 'error occured on Adding Use. Please try again.';
            document.getElementById("popUpBtn").click();  
            this.ngOnInit();
          }
        });
    }else{
      console.log('submitModal');
      this.popUpHeader = 'Alert';
      this.popUpContent = 'Please fill all required values';
      document.getElementById("submitModalhide").click(); 
    }
    this.ngOnInit();
    console.log(this.project.status);
   }
  ngOnInit() {

    this.hasSetDefaultDate=true;
    this.project = {
      "projectId":"",
      "project":"",
      "priority":"1",
      "employeeName":"",
      "employeeId":""
    };
  }

  showUserPopUp(){
    this.project.employeeId='';
    this.userList = [];
    for ( var i = 0; i < this.intermittentUserList.length; i++)
    {
      if(this.intermittentUserList[i].employeeId.toLowerCase().indexOf(this.project.managerName.toLowerCase()) > -1){
        this.userList.push(this.intermittentUserList[i]);
      }else if(this.intermittentUserList[i].firstName.toLowerCase().indexOf(this.project.managerName.toLowerCase()) > -1){
        this.userList.push(this.intermittentUserList[i]);
      }else if(this.intermittentUserList[i].lastName.toLowerCase().indexOf(this.project.managerName.toLowerCase()) > -1){
        this.userList.push(this.intermittentUserList[i]);
      }
    }
    if(this.userList.length ===0){
      this.popUpHeader = 'Error!!!';
      this.popUpContent = 'No user found. Please try again.';
      document.getElementById("submitModalhide").click();  
    
    }else{
    document.getElementById("userModalhide").click();
  }
  }

  sortByStartDate(){
    this.projectsList = [];
    this.projectsList = this.intermittentProjectList;
    this.projectsList.sort((a, b) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

    console.log(this.projectsList);
  }

  sortByEndDate(){
    this.projectsList = [];
    this.projectsList = this.intermittentProjectList;
    this.projectsList.sort((a, b) => {
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    });
  }

  sortByPriority(){
    this.projectsList = [];
    this.projectsList = this.intermittentProjectList;
    this.projectsList.sort((a, b) => {
      return parseInt(a.priority) - parseInt(b.priority);
    });
  }

  sortByStatus(){
    this.projectsList = [];
    this.projectsList = this.intermittentProjectList;
    this.projectsList.sort((a, b) => {
      var titleA = a.status.toLowerCase(), titleB = b.status.toLowerCase();
      if (titleA < titleB) return -1; 
      if (titleA > titleB) return 1;
      return 0;
    });
  }
}
