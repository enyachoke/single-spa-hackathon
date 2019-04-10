import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'navbar';
  constructor(private router: Router) { }
  ngOnInit() {

    if (!this.getAuth()) {
      console.log('called');
      this.router.navigate(['/login']);
    } else {
      this.router.navigateByUrl('/patientsearch');
    }
  }
  getAuth() {
    const auth = sessionStorage.getItem('auth.credentials');
    return auth;
  }
}
