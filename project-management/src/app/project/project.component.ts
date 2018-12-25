import { Component, OnInit } from '@angular/core';
import { User } from '../adduser/user';
import { Project } from './project';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common'

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

  constructor(public datepipe: DatePipe,private router: Router,private projectService: ProjectService,private userService: UserService) {
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
   createProject():void{
    console.log(this.project);
    this.project.status='Open';
   if(!this.hasSetDefaultDate){
     this.project.startDate = new Date();
     this.project.endDate = new Date();
   }
    if(this.project.projectName != '' && this.project.employeeName !='' && this.project.employeeId!=''){
      this.projectService.createProject(this.project)
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
        },
        error => {alert("Error in creating Project");});
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
   // this.project.employeeId='';
    this.userList = [];
    if(this.intermittentUserList.length>0){
    for ( var i = 0; i < this.intermittentUserList.length; i++)
    {
      console.log("intermittentUserList"+this.intermittentUserList[i].employeeId);
      if(this.intermittentUserList[i].employeeId.indexOf(this.project.employeeId) > -1){
        this.userList.push(this.intermittentUserList[i]);
      }else if(this.intermittentUserList[i].firstName.toLowerCase().indexOf(this.project.employeeName.toLowerCase()) > -1){
        this.userList.push(this.intermittentUserList[i]);
      }else if(this.intermittentUserList[i].lastName.toLowerCase().indexOf(this.project.employeeName.toLowerCase()) > -1){
        this.userList.push(this.intermittentUserList[i]);
      }
    }
    if(this.userList.length ===0){
      this.popUpHeader = 'Error!!!';
      this.popUpContent = 'No users found. Please try again.';
      document.getElementById("popUpBtn").click();  
    
    }else{
      console.log("opeing user popup");
    document.getElementById("userPopUpBtn").click();
    }
  }else{
    this.popUpHeader = 'Warning';
    this.popUpContent = 'No users found. Please create users.';
    document.getElementById("popUpBtn").click();  

  }
  }

  selectManager1(){
    console.log("in selec manager ");
  }
  selectManager(user : any){
    console.log("in selec manager 1");
    this.project.employeeName = user.firstName+' '+user.lastName;
    this.project.employeeId=user.employeeId;
    this.project.userId = user.userId;
    this.project.firstName = user.firstName;
    this.project.lastName = user.lastName;
    //this.project.manager.firstName = user.firstName;
  //  this.project.manager.lastName = user.lastName;
   // this.project.manager.employeeId = user.employeeId;
    this.project.employeeId=user.employeeId;

    console.log(this.project.manager);
    document.getElementById("modalClose").click();
    
  
  }

  suspend(project: any){
    project.status = 'Completed';
    this.project = {
      "projectId":project.projectId,
      "project":project.project,
      "startDate":project.startDate,
      "endDate": project.endDate,
      "priority":project.priority,
      "status":project.status,
      "employeeId": project.employeeId
    };
    this.projectService.createProject(this.project)
    .subscribe( (data: any) => {
      if(data){
        this.popUpHeader = 'Note:';
        this.popUpContent = 'User saved Successfully'
        document.getElementById("submitModalhide").click();  
        document.getElementById("reset").click();  
        this.ngOnInit();
      }
      else{
        this.popUpHeader = 'Error!!!';
        this.popUpContent = 'error occured on Adding Use. Please try again.';
        document.getElementById("submitModalhide").click();  
        this.ngOnInit();
      }
    });
  }

  updateProject(project : any){
    
    var manager : any = {};
    for ( var i = 0; i < this.userList.length; i++)
    {
      if(this.userList[i].employeeId === project.employeeId){
        manager = this.userList[i];
      }
    }
    var managerName = '';
    var managerId = '';
    if(manager.status === 'A'){
      managerName = manager.lastName + ', ' + manager.firstName;
      managerId = manager.employeeId; 
    }
    console.log( this.datepipe.transform(project.startDate, 'yyyy-MM-dd'));

    this.project = {
      "projectId":project.projectId,
      "project":project.project,
      "startDate":  this.datepipe.transform(project.startDate, 'mm/dd/yyyy'),
      "endDate":  this.datepipe.transform(project.endDate, 'mm/dd/yyyy'),
      "priority":project.priority,
      "status":project.status,
      "employeeId": managerId,
      "employeeName": managerName
    };
    console.log(this.project);
    document.getElementById('project').focus();
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
