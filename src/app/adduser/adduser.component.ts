import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  user: any = {};
  userList: any[] = [];
  intermittentList : any = [];
  searchText:string ='';
  constructor(private router: Router,private taskervice: TaskService) {
    taskervice.getAllUsers().subscribe((data :any) => {
      this.userList = data;
      this.intermittentList = data;
    });
   }

   getAllUsers(): void {
    this.taskervice.getAllUsers()
        .subscribe( data => {
          this.userList = data;
          this.intermittentList = data;
        },
        error => {
         alert("ERROR");
       });
 };

   addUser(): void {
   this.user.errorLastName ='';
   this.user.errorFirstName ='';
   this.user.errorEmployeeId ='';
   this.user.searchText='';
    if(!this.error.isError){
            this.taskervice.addUser(this.user)
         .subscribe( data => {
                     
           for (const fieldName of Object.keys(data)) {
             const serverErrors = data[fieldName];
             //alert(fieldName +  data[fieldName]);
            
             if(fieldName =='firstName'){
               console.log(data[fieldName]);
               this.user.errorFirstName = data[fieldName];
             }
             if(fieldName =='lastName'){
             //  console.log(data[fieldName]);
               this.user.errorLastName = data[fieldName];
             }

             if(fieldName =='employeeId'){
                this.user.errorEmployeeId = data[fieldName];
              }
             
           }
          
           if(this.user.errorFirstName!=""  && this.user.errorLastName!="" && this.user.errorEmployeeId!=""){
         
           this.router.navigate(['/addUser']);
           }else{
             //console.log(this.task.errorMessages +this.task.errorTask+this.task.errorParentTask)
           }
         },
         error => {
           alert("User created successfully.");
           this.user.errorLastName ='';
           this.user.errorFirstName ='';
           this.user.errorEmployeeId ='';
           this.user.firstName='';
           this.user.lastName='';
           this.user.searchText='';
           //call reset 

           this.getAllUsers();
       }
        
       );
    
     }else{
      
     }
 };

 error:any={isError:false,errorMessage:''};

  ngOnInit() {
    this.error={};
    this.getAllUsers();
this.user={
  "firstName":'',
  "lastName":'',
  "employeeId":''
}

  }

  editUser(user : any){
    this.user = {
      "employeeId":user.employeeId,
      "firstName":user.firstName,
      "lastName":user.lastName,
      "status": user.status
    };
    document.getElementById('lastName').focus();
  }  

  sortByFirstName(){
    this.userList   = [];
    
    this.intermittentList.sort((a, b) => {
      var fNameA = a.firstName.toLowerCase(), fNameB = b.firstName.toLowerCase();
      return fNameA >fNameB?1:fNameA<fNameB?-1:0
    });
    console.log(this.intermittentList);

    this.userList   = [];
   // this.usersList = this.intermittentList;
   this.userList = this.intermittentList;
  }

  sortByLastName(){
    this.userList   = [];
    
    this.intermittentList.sort((a, b) => {
      var lNameA = a.lastName.toLowerCase(), lNameB = b.lastName.toLowerCase();
      return lNameA >lNameB?1:lNameA<lNameB?-1:0
    });
    console.log(this.intermittentList);
    this.userList = this.intermittentList;
  }

  sortByEmployeeId(){
    this.userList   = [];
    
    this.intermittentList.sort((a, b) => {
      var eIdA = a.employeeId, eIdb = b.employeeId;
      return eIdA >eIdb?1:eIdA<eIdb?-1:0
    });
     
    this.userList = this.intermittentList;
  }

}
