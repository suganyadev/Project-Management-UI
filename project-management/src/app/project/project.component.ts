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
  title:string="Add Project";
  project : any = {};
  user : any = {};
  projectsList : any = [];
  intermittentProjectList : any = [];
  userList : any = [];
  intermittentUserList : any = [];
  popUpHeader : string = 'Select the manager';
  popUpContent : string = '';
  searchText:string ='';
  updateBtn:boolean=false;

  constructor(public datepipe: DatePipe,private router: Router,private projectService: ProjectService,private userService: UserService) {
    this.project = {
      "projectId":"",
      "project":"",
      "priority":"1",
      "employeeName":"",
      "employeeId":""
    };

    userService.getAllUsers().subscribe((data :any) => {
      
      this.userList = data;
      this.intermittentUserList=data;
    });
    projectService.getAllProjects().subscribe((data :any) => {
     
      this.projectsList = data;
      this.intermittentProjectList = data;
    });

   }
   createProject():void{
        
    this.project.errorMessage='';
    if(null!=this.project && this.project.projectName != '' && this.project.employeeName !='' && this.project.employeeId!=''){
      this.project.status='Open';
    if(!this.hasSetDefaultDate){
      this.project.startDate = new Date();
      this.project.endDate = new Date();
    }else{
      if(new Date(this.project.startDate)>new Date(this.project.endDate)){
        this.project.errorMessage='End Date cant before start date';
     }
    }
    if(this.project.errorMessage==''){
       this.project.startDate= new Date(this.project.startDate);
        this.project.endDate =new Date(this.project.endDate);

    this.projectService.createProject(this.project)
        .subscribe( (data: any) => {
          if(data){
            this.popUpHeader = 'Note:';
            this.popUpContent = 'Project saved Successfully'
            this.updateBtn=false;
            document.getElementById("popUpBtn").click();  
            document.getElementById("reset").click();  
            this.ngOnInit();
          }
          else{
            this.popUpHeader = 'Error!!!';
            this.popUpContent = 'error occured on Adding Use. Please try again.';
            document.getElementById("popUpBtn").click();  
            this.updateBtn=false;
            this.ngOnInit();
          }
        },
        error => {
          this.popUpHeader = 'Note:';
          this.popUpContent = 'Project saved successfully'
          document.getElementById("popUpBtn").click();  
          document.getElementById("reset").click();  
          this.updateBtn=false;
          this.ngOnInit();
        });
    }else{
      console.log('submitModal');
      this.popUpHeader = 'Alert';
      if(this.project.errorMessage!=''){
        this.popUpContent = this.project.errorMessage;
      }else{
        this.popUpContent = 'Please fill all mandatory fields';
      }document.getElementById("popUpBtn").click(); 
    }
    //this.ngOnInit();
    
  }
   }
  ngOnInit() {

    this.hasSetDefaultDate=true;
    this.project = {
      "projectId":"",
      "project":"",
      "priority":"1",
      "employeeName":"",
      "employeeId":"",
       
    };
  }

  showUserPopUp(){
   // this.project.employeeId='';
    //this.userList = [];
    this.userService.getAllUsers().subscribe((data :any) => {
      
      this.userList = data;
     
    });
     if(this.userList.length>0){
    /*for ( var i = 0; i < this.intermittentUserList.length; i++)
    {
      console.log("intermittentUserList"+this.intermittentUserList[i].employeeId);
      if(this.intermittentUserList[i].employeeId.indexOf(this.project.employeeId) > -1){
        this.userList.push(this.intermittentUserList[i]);
      }else if(this.intermittentUserList[i].firstName.toLowerCase().indexOf(this.project.employeeName.toLowerCase()) > -1){
        this.userList.push(this.intermittentUserList[i]);
      }else if(this.intermittentUserList[i].lastName.toLowerCase().indexOf(this.project.employeeName.toLowerCase()) > -1){
        this.userList.push(this.intermittentUserList[i]);
      }
    } */
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
 
  selectManager(user : any){
    
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
      "employeeId": project.employeeId,
      
    };
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
    if(manager.status === 'Active'){
      managerName =  manager.firstName + ' ' +manager.lastName;
      managerId = manager.employeeId; 
      this.updateBtn=true;
    }
    var d =this.datepipe.transform(project.startDate, 'MM/dd/yyyy');
    console.log(d+ "\n"+project.startDate + "\n"+ this.datepipe.transform(d, 'mm/dd/yyyy'));
// /this.datepipe.transform(project.endDate, 'mm/dd/yyyy'),
    this.project = {
      "projectId":project.projectId,
      "project":project.project,
      "startDate":this.datepipe.transform(project.startDate, 'MM/dd/yyyy'),
      "endDate":this.datepipe.transform(project.endDate, 'MM/dd/yyyy'),
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
