import { Component, Input } from '@angular/core';
//import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
//import { IssueService } from '../issue.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private http:HttpClient, private router: Router) { }

  @Input()
  //variable to store the selected radio button
  answer = '';
//variable for storing the results
res = '';


//submit Function
  onSubmit(data)
   {
    //sweet Alerts pop up messages
    Swal.fire({
      title: 'Register New User?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Use EventEmitter with form value
        //console.warn(this.ngForm.value);
        
        if(this.answer == 'student')
        {
              //Add the User to the Database
            this.http.post('http://localhost:3000/registration',data, {responseType:'text'})
            .subscribe((result)=>{
              //storing the results inside this variable
              this.res = result;
            console.warn("result",result)
            //On submit validation
            if(result == 'user registered sucessfully')
            {
              //Routing
              this.router.navigate(['/login']);

              Swal.fire(
                result,
                '',
                'success'
              )
              

            }else{
              Swal.fire(
                result,
                '',
                'warning'

              )
              
            }
          })
          
        
        }
        if(this.answer == 'lecturer')
        {
              //Add the User to the Database
              this.http.post('http://localhost:3000/Lec_registration',data, {responseType:'text'})
              .subscribe((result)=>{
              console.warn("result",result)
              this.res = result;
              //On submit validation
              if(result == 'user registered sucessfully')
              {
                //Routing
                this.router.navigate(['/login']);

                Swal.fire(
                  result,
                  '',
                  'success'
                )
                
              }else{
                Swal.fire(
                  result,
                  '',
                  'warning'
                )
              }
  
            })
            console.warn(data);
        }
        //check if the radio button is clicked
        if(this.answer == "")
        {
          Swal.fire(
            'Select your Role as a Student or Lecturer',
            '',
            'error'
          )
        }
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Could Not Add The User!',
          'error'
        )
      }
    })
        //Router to login if successful
        if(this.res == '')
        {
          //Remain on registration page
          this.router.navigate(['/registration']);
          console.warn(this.res);
        }else{
          //Navigate to the Login  page
          this.router.navigate(['/login']);
          console.warn(this.res);
        }
        console.warn(this.res);
  }

}
