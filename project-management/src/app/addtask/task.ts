import {SearchCriteria} from '../services/search.criteria';
 
export class Task {
   
    public errorMessages: string;
    public task: string;
    public priority: number;
    public startDate: Date;
    public endDate: Date;
    public taskId: number;
    public priorityFrom: number;
    public status:string;
    public priorityTo: number;
    public parentTaskId: number;
    public parentTask:string;
    public searchCriteria:SearchCriteria;
    public errorTask: string;
    public errorParentTask: string;
    public errorDate: string;
    public userId: number;
    public isParentTask: boolean;
    public projectName:String;
    public firstName: String;
    public lastName: String;

}