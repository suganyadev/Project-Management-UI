import {SearchCriteria} from '../services/search.criteria';
import {Project} from '../project/project';

export class User {
    public firstName:string;
    public lastName:string;
    public status:string;
    public employeeId:string;
    public userId:number;

    public errorFirstName:string;
    public errorLastName:string;
    public errorEmployeeId:string;
    public project:Project;
}