import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }
  user:User = new User();
  onSubmit(frm:NgForm){
    if(frm.valid){ 
      
      if(this.authService.doLogin(this.user))
      {
        this.router.navigate(['']);
      }else{
        alert('Đăng nhập thất bại');
      }

    }
  }


}
