import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.page.html',
  styleUrls: ['./nav.page.scss'],
})
export class NavPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  onClick() {
    this.route.navigate(['home']);
  }

}
