import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgat-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgat-password.component.html',
  styleUrl: './forgat-password.component.scss'
})
export class ForgatPasswordComponent {

  private readonly _AuthService=inject(AuthService);
  private readonly _Router=inject(Router)

  isLoading:boolean=false
  msgError:string=''
  step:number=1;
  verifyEmail:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })

  verifyCode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
  })

  resetPassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl( null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  })


  verifyEmailSubmit():void{
    if(this.verifyEmail.valid){
      this.isLoading=true
      this.verifyEmail.value
      let emailValue=this.verifyEmail.get('email')?.value;
      this.resetPassword.get('email')?.patchValue(emailValue)
         this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
           next: (res) => {
            if(res.statusMsg==='success'){
             this.step=2
this.isLoading=false

            }
         },
     error:(err)=>{
      console.log(err.error.message)

     this.msgError=err.error.message

       this.isLoading=false
     }

       })



    }


  }

  verifyCodeSubmit():void{

    if(this.verifyCode.valid){
    this.isLoading=true
    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
       if(res.status==='Success'){
        this.step=3
        this.isLoading=false


       }
    },
error:(err)=>{
  console.log(err);
  this.msgError=err.error.message
  this.isLoading=false
}

  })
  }
  }


  ResetPasswordSubmit():void{
    if(this.resetPassword.valid){
    this.isLoading=true
    this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token),
this._AuthService.saveUserData()
this._Router.navigate(['/home'])
this.isLoading=false
    },
error:(err)=>{

  console.log(err);
  this.msgError=err.error.message
  this.isLoading=false
}

  })

  }

  }

}
