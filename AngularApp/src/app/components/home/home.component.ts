import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string;

  constructor(authService: AuthService) {
    this.userName = authService.decodedToken.unique_name;
  }

  ngOnInit() {
  }

}
