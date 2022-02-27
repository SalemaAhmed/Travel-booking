import { AbstractControl } from '@angular/forms';

export class CustomValidator{
    static domainValidation(emailDomain:string){
        return (control: AbstractControl): {[key:string]:any} | null =>{
          if(control.value){
            const email :string=control.value;
            const domain=email.substring(email.lastIndexOf('@')+1);
            if(domain.toLocaleLowerCase() === emailDomain){
              return null;
            }
            else {
              return {'emailDomain': true}
            }
          }
          return null;
        };
      }
}
