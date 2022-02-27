import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightsService } from 'src/app/services/flights.service';
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  constructor(private _Router:Router, private _FlightsService:FlightsService,private _ActivatedRoute:ActivatedRoute) { }
  message: any;
  subscription:any;
  fromCountry:any;
  toCountry:any;
  flightsData:any;
  imgPrefix='./assets/images/'
  ngOnInit(): void {
    this.fromCountry=this._ActivatedRoute.snapshot.queryParams['fromCountryId'];
    console.log("dsaaaaa",this.fromCountry)
    this.toCountry=this._ActivatedRoute.snapshot.queryParams['toCountryId'];
    this.searchFlight();
  }
  bookFlight(flight:any){
    this._FlightsService.setTrip(flight);//{ queryParams: {id: 37, username: 'jimmy'}}
    this._Router.navigate(["/reservation"],{ queryParams: {fromCountryId: this.fromCountry, toCountryId: this.toCountry ,flightId:flight.id}});
  }
  searchFlight(){
    this._FlightsService.searchFlight(this.fromCountry,this.toCountry,false).subscribe(
        (data:any)=>{
          this.flightsData=data;
          console.log("flights List ", data);
        },
    //   (error)=>{
    //     console.log("Error"+error);
    //   },
      )
    // this._FlightsService.searchFlight(this.fromCountry,this.toCountry,false).subscribe(
    //   (data:any)=>{
    //     console.log("devices List ", data);
    //     this.devicesList=data.result;
    //     this.totalListItems=data.paginationInfo.total;
    //     console.log(data);
    //   },
    //   (error)=>{
    //     console.log("Error"+error);
    //   },
    //   ()=>{
    //     console.log("done");
    //   }
    // )
    // this._Router.navigate(["/flights"]);
  }
}
