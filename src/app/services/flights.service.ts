import { Injectable } from '@angular/core';
// import "rxjs/add/observable/of"
import { BehaviorSubject, Observable, of } from 'rxjs';

// import { Observable } from "rxjs/Observable"
import { HttpClient } from '@angular/common/http';
import { IPurchase } from '../interfaces/ipurchase';
@Injectable({
  providedIn: 'root'
})

export class FlightsService {
  flightResponce=[{
    id:1,
    toCityImg:'Athens_img.jpg',
    price:2300,
    arrivalTime:'2022/3/3 12:00',
    departureTime:'2022/3/3 2:30 ',
    fromAirPort:'Cairo Airport',
    toAirPort:'Athens Airport ',
  },
  {
    id:2,
    toCityImg:'crete_img.jpg',
    price:4700,
    arrivalTime:'2022/4/2 18:00',
    departureTime:'2022/4/3 1:00 ',
    fromAirPort:'Cairo Airport',
    toAirPort:'Crete Airport ',
  },
  {
    id:3,
    toCityImg:'corfu_img.jpg',
    price:3500,
    arrivalTime:'2022/4/2 18:00',
    departureTime:'2022/4/3 1:00 ',
    fromAirPort:'Cairo Airport',
    toAirPort:'Crete Airport ',
  }];
  private trip  = new BehaviorSubject({});
  currentTrip = this.trip.asObservable();
  setTrip(selectedTrip :any) {
    this.trip.next(selectedTrip)
  }
  IPurchase:IPurchase={};
  constructor(private _HttpClient:HttpClient) { }
  searchFlight(fromCountryId:number,toCountryId:number,byUrl:boolean):Observable<any> 
  {
    console.log("inside get searchFlights");
    if(byUrl)
     return this._HttpClient.get(`http://URL/search?fromId=${fromCountryId}&toId=${toCountryId}`);
    else
      return of(this.flightResponce)
  }
  getNationalities():Observable<any> {
    return this._HttpClient.get('https://api.manatal.com/open/v3/nationalities/')
  }
  bookTrip(bookingData:IPurchase):Observable<any> {
    return this._HttpClient.post('Url',bookingData);
  }
  makePayment(stripeToken: any,byUrl:boolean): Observable<any>{
    if(byUrl)
      return this._HttpClient.post<any>('url',{token:stripeToken})
    else
      return of({data:'success'})
  }
}
