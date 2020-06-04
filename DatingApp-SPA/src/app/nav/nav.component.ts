import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(
    public authService: AuthService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model)
    .pipe(
    ).subscribe(() => {
        this.alertifyService.message('log in');
      }, error => {
        this.alertifyService.error(error);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.alertifyService.message('log out');
  }

  logIn() {
    return this.authService.logIn();
  }
}
