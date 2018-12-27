import {SearchCriteria} from '../services/search.criteria';
import {Manager} from '../adduser/manager';
export  class Project{
    public project:string;
    public startDate: Date;
    public endDate: Date;
    public priority: string;
    public projectId: number;
    public userId: number;
    public employeeName:string;
    public employeeId:string;
    public manager:Manager;
    public firstName:string;
    public lstName:string;
    public hasSetDefaultDate:boolean;
    public errorMessage:String;
}