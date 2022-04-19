import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  nav_items=[
    {name:'currency converter', url:'currency-converter', is_active:true},
    {name:'view convertion history', url:'convertion-history', is_active:false},
  ]

  ngOnInit(): void {
  }

}
