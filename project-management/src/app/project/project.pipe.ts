import {Pipe, PipeTransform,Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';
import {Project} from './project';

@Pipe({name:'ProjectPipe'})
@Injectable()
export class ProjectPipe implements PipeTransform{
    transform(userList:Project[],field:string): Project[] {
       console.log(field + "field --->"+field)
    
       if (userList && userList.length){
        return userList.filter(item =>{
            if (field === '' || field === undefined || field === null)
            {
                return true;
            }else if (field)
            {
                if(item.project.toLowerCase().indexOf(field.toLowerCase()) > -1){
                    return true;
                }
            }else{
                return false;
            }
            return false;
       })
    }
    else{
        return userList;
    }
}
}