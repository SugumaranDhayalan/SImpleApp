import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  date: any;
  constructor(private router: Router) {
    this.date = new Date().toLocaleDateString();
  }

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(['nav']);
  }

}
