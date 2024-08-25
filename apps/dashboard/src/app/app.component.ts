import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '@pot-mf/data-access-user';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'ng-mf-root',
  template: `
    <div class="dashboard-nav">Admin Dashboard</div>
    <div *ngIf="isLoggedIn$ | async">
      You are authenticated so you can see this content.
      <ul class="remote-menu">
        <li><a routerLink="/">Home</a></li>
        <li><a routerLink="login">Login</a></li>
        <li><a routerLink="angular">Angular</a></li>
      </ul>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<any>;

  constructor(private userService: UserService, private router: Router) {
    this.isLoggedIn$ = this.userService.isUserLoggedIn$;
  }

  ngOnInit() {
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        setTimeout(() => {
          if (!loggedIn) {
            this.router.navigateByUrl('login');
          } else {
            this.router.navigateByUrl('home');
          }
        });
      });
  }
}
