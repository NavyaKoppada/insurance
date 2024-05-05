import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';

  constructor(
    private router: Router,
    // private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  handleLogin(): void {
    const payload = {
      username: this.userName,
      password: this.password
    };

    // this.apiService.login(payload).subscribe(
    //   (response: any) => {
    //     console.log("signup done", response);
    //     if (response.status === 200) {
    //       localStorage.setItem("name", response.data.username);
    //       localStorage.setItem("token", response.data.refresh_token);
    //       this.router.navigate(['/home']);
    //     } else {
    //       this.notify(response?.response?.data?.message);
    //     }
    //   },
    //   (error: any) => {
    //     console.error('Error occurred:', error);
    //   }
    // );
  }

  notify(message: string): void {
    console.log("Toast Message:", message);
    this.toastr.error(message);
  }
}
