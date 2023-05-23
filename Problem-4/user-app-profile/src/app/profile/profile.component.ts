import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  username: string = '';

  constructor() {
    // Retrieve the username from localStorage or from any other source
    this.username = localStorage.getItem('username') || '';
  }
}
