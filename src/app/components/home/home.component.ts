import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fromCountry:any;
  toCountry:any;
  countries=[
    {name:'cairo',
    id:1},
    {name:'Greece',
    id:2},
    {name:'USA',
    id:3}
  
  ];
  
  constructor(private _Router:Router, private _FlightsService:FlightsService) { }
  message:any
  ngOnInit(): void {
    console.log('kkkkk',this.countries);
  }
  searchFlight(){
    if(this.fromCountry && this.toCountry ){
      this._Router.navigate(["/flights"],{ queryParams: {fromCountryId: this.fromCountry.id, toCountryId: this.toCountry.id }});
    }
  }
}
