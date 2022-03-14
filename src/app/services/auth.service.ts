import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  verifyUser(user: User) {
    let strUser = localStorage.getItem('users');
    let { name, email, password } = user;
    let dataUser = { name: name, email: email, password: password };
    let isAccount: boolean = false;
    console.log('vafo');

    if (strUser) {
      let users = JSON.parse(strUser);

      users.forEach((u: any) => {
        console.log('taif koan', u);

        if (dataUser.name === u.name && dataUser.password === u.password) {
          isAccount = true;
        }
      });
    }
    console.log(isAccount);

    return isAccount;
  }

  checkLogin() {
    let strUser = localStorage.getItem('users');
    if (strUser) {
      let users = <User>JSON.parse(strUser);
      console.log(this.verifyUser(users));

      return true;
    }
    return false;
  }

  doLogin(user: User) {
    if (this.verifyUser(user)) {
      return true;
    }
    return false;
  }

  logout() {
    console.log('vao logout');
    
    return localStorage.removeItem('users');
  }

  doRegister(user: User) {
    let strUser = localStorage.getItem('users');
    let { name, email, password } = user;
    let dataUser = { name: name, email: email, password: password };
    if (strUser) {
      let users = JSON.parse(strUser);
      console.log('0', users);

      let isEmail = false;

      users.forEach((u: any) => {
        if (dataUser.email === u.email) {
          isEmail = true;
        }
      });
      if (isEmail === false) {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
      } else {
        return false;
      }
    } else {
      let users = [];

      console.log('0', dataUser);

      users.push(dataUser);

      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
  }
}
