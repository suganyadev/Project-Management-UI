import { Pipe, PipeTransform } from '@angular/core';
import {User} from './user';
@Pipe({  name: 'orderBy' })
export class OrderBy implements PipeTransform {

    transform(userList: User[], args?: any): any {
       
        return userList.sort(function(a, b){
            if(args=='firstName'){
                console.log("ffff");
                var fNameA = a.firstName.toLowerCase(), fNameB = b.firstName.toLowerCase();
                return fNameA >fNameB?1:fNameA<fNameB?-1:0;
            }else if(args=='lastName'){
                var lNameA = a.lastName.toLowerCase(), lNameB = b.lastName.toLowerCase();
                return lNameA >lNameB?1:lNameA<lNameB?-1:0;
            }
            else{
                var eIdA = a.employeeId, eIdb = b.employeeId;
                return eIdA >eIdb?1:eIdA<eIdb?-1:0;
            }
        });
    };
}