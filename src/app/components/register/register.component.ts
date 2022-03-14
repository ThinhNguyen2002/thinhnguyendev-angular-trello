import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  

  constructor(private router:Router, private authService:AuthService) { }

  user:User = new User();

  ngOnInit(): void {
  }

  onRegister(frm:NgForm){ 
    if(this.authService.doRegister(this.user)){
      {
        alert('Tạo tài khoản thàn công ');
        this.router.navigate(['/login']);
      }
    }else{
      this.user.password='';
      alert('Email đã tồn tại !!');
    }
    
  }

}
