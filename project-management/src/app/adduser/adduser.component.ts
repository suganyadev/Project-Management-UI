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
  title:string="Add User";
  user : any = {};
  userList : any = [];
  tempusersList : any = [];
  tempUserId:Number=0;
  searchText:string ='';
  searchTextHide:string ='';
  editBtn:boolean=false;
  constructor(private router: Router,private taskervice: TaskService) {
   
   }

   getAllUsers() {
    this.taskervice.getAllUsers()
        .subscribe( data => {
          this.userList = data;
          this.tempusersList = data;
        },
        error => {
         alert("ERROR");
       });
       return this.userList;
 };

   addUser(): void {
    this.user.errorLastName ='';
    this.user.errorFirstName ='';
    this.user.errorEmployeeId ='';
    this.user.searchText='';
    this.user.errorMessage ='';
     if(this.user.firstName=='' || this.user.lastName=='' || this.user.employeeId.length==0){
      if(this.user.firstName==''){
        this.user.errorFirstName ='Enter first name';
       }
       if(this.user.lastName==''){
        this.user.errorLastName ='Enter last name';
       }
     
       if(this.user.employeeId.length==0){
        this.user.errorEmployeeId ='Enter employeeId';
       }
     }else{
   
    if(!this.error.isError){
            this.taskervice.addUser(this.user)
         .subscribe( data => {
                     
           for (const fieldName of Object.keys(data)) {
             const serverErrors = data[fieldName];
             //alert(fieldName +  data[fieldName]);
            
             if(fieldName =='firstName'){
               
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
           this.user.employeeId='';
           //call reset 

           this.getAllUsers();
       }
        
       );
    
     }else{
      
     }
    }
    this.editBtn=false;
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
  
  deleteUser(user : any){
   
  
    
    this.taskervice.deleteUser(user.userId).subscribe( data => {
      alert(data);
     },
    error => {
     alert("Deleted User Successfully");
   });;
    document.getElementById('lastName').focus();
  } 
  editUser(user : any){
    this.editBtn=true;
    this.user = {
      "employeeId":user.employeeId,
      "firstName":user.firstName,
      "lastName":user.lastName,
      "status": user.status,
      "userId":user.userId
    };
  
    document.getElementById('lastName').focus();
  }  
  filterSearchText(){
    
    this.searchTextHide =this.searchText;
    if (this.tempusersList && this.tempusersList.length){
      this.userList =  this.tempusersList.filter(item =>{
          
              if(item.firstName.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1){
                  return true;
              }
              if(item.lastName.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1){
                 return true;
             }
           
          return false;
     })
  }
  else{
      return this.userList;
  }
  }

  sortByFirstName(){
  
    this.userList.sort((a, b) => {
      var fNameA = a.firstName.toLowerCase(), fNameB = b.firstName.toLowerCase();
      return fNameA >fNameB?1:fNameA<fNameB?-1:0
    });
     
    this.userList   = [];
   this.userList = this.tempusersList;
  
  }

  sortByLastName(){
    this.userList   = [];
    this.tempusersList.sort((a, b) => {
    var lNameA = a.lastName.toLowerCase(), lNameB = b.lastName.toLowerCase();
      return lNameA >lNameB?1:lNameA<lNameB?-1:0
    });
     
    this.userList = this.tempusersList;
    
    
  }

  sortByEmployeeId(){
    this.userList   = [];
    
    this.tempusersList.sort((a, b) => {
      var eIdA = a.employeeId, eIdb = b.employeeId;
      return eIdA >eIdb?1:eIdA<eIdb?-1:0
    });
     
    this.userList = this.tempusersList;
  }


  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
    this.userList[0].firstName = this.userList[0].firstName.sort((n1,n2) => {
      if (n1 < n2) {
          return 1;
      }
  
      if (n1 > n2) {
          return -1;
      }
  
      return 0;
  });
  }
}
