import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'music-player';

  user;

  constructor(public auth: AuthService, public userService: UserService) {
    this.userService.getUser().subscribe(res => {
      console.log(res);
      this.user = res;
    })
  }
}
