import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  routerLink= "auth/login"
  constructor() { }

  ngOnInit(): void {
  }
  onClick(){
    return this.routerLink;
  }

}
