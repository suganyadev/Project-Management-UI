import {Pipe, PipeTransform,Injectable } from '@angular/core';
import {SearchCriteria} from './search.criteria';
import {Task} from '../addtask/task';

@Pipe({name:'searchFilter'})
@Injectable()
export class SearchPipe implements PipeTransform{
    transform(searchCriteria:SearchCriteria,filter:string){
       
       
      
}
}