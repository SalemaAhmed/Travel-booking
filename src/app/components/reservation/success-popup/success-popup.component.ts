import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss']
})
export class SuccessPopupComponent implements OnInit {
  constructor( private _FlightsService:FlightsService,public activeModal: NgbActiveModal) { }
  trip:any;
  ngOnInit(): void {
    this._FlightsService.currentTrip.subscribe((trip)=> this.trip=trip)
  }

}
