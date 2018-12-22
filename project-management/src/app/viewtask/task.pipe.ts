import {Pipe, PipeTransform,Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';
import {Task} from '../addtask/task';

@Pipe({name:'filter'})
@Injectable()
export class TaskPipe implements PipeTransform{
    transform(taskList:Task[],field:string,value:string): Task[] {
      
    if (!taskList) {
        return [];
    }
    if (!field || !value) {
        return taskList;
    }
  
    if(value === ""){
        return taskList;
    }else{
        if(field=="task"){
            return taskList.filter(singleTask =>
            singleTask.task.includes(value)
            ); 
        }else if(field=="parentTask"){
            return taskList.filter(singleTask =>
                singleTask.parentTask.includes(value)
                );
        }
        else if(field=="priorityFrom"){
            return taskList.filter(singleTask => singleTask.priority >= parseInt(value)
                );
        }
        else if(field=="priorityTo"){
            return taskList.filter(singleTask => singleTask.priority <= parseInt(value));
        }
        else if(field=="startDate"){
            return taskList.filter( singleTask => {
                var datePipe = new DatePipe('en-US');
                let str = datePipe.transform(singleTask.startDate,'dd-MM-yyyy');
               if(str.includes(value)){
                    return singleTask;
                }else{
                    return null;
                }
                
            });
        }
        else if(field=="endDate"){
            return taskList.filter(singleTask => {
                var datePipe = new DatePipe('en-US');
                let str = datePipe.transform(singleTask.endDate,'dd-MM-yyyy');
               if(str.includes(value)){
                    return singleTask;
                }else{
                    return null;
                }
                
            });
               
        }
    
}
     
}
 
}
