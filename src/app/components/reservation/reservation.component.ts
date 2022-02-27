import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightsService } from 'src/app/services/flights.service';
import {IPurchase} from'../../interfaces/ipurchase';
import { CustomValidator} from '../../shared/custom-validators';
import { SuccessPopupComponent } from './success-popup/success-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  paymentHandler:any = null;
  nationalities:any;
  trip:any;
  maxDate=new Date();
  notification ={
    notify:false,
    type:''
  }
  constructor( private _FlightsService:FlightsService,public _modalService: NgbModal) { 

  }
  bookingData:IPurchase={};
  purchasingForm=new FormGroup({
    travelerName:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(100)]),
    dateOfBirth:new FormControl(null,Validators.required),
    contactPreference:new FormControl('email',Validators.required),
    email:new FormControl(null,[Validators.required,CustomValidator.domainValidation('gmail.com')]),
    mobile:new FormControl(null),
    nationality:new FormControl('null'),
    payment:new FormControl(null)
  })
  ngOnInit(): void {
    this._FlightsService.currentTrip.subscribe((trip)=> this.trip=trip)
    console.log("message",this.trip);
    this.invokeStripe();
    this.initializeDropdowns();
    this.purchasingForm.get('contactPreference')?.valueChanges.subscribe((contactSelected:string)=>{
      this.onContactValueChanged(contactSelected);
    })
  }
  initializeDropdowns(){
    this._FlightsService.getNationalities().subscribe((response)=>{
      this.nationalities=response;
      console.log("nationalities ", this.nationalities);
    },
    (error)=>{
          console.log("Error"+error);
          this.nationalities=[{"id": 0,"demonym": "None"}]
        })
  }
  submitForm(formData:FormGroup){
    this.bookingData.name=this.purchasingForm.controls['travelerName'].value;
    this.bookingData.birthDate=this.purchasingForm.controls['dateOfBirth'].value?.toISOString();
    this.bookingData.email=this.purchasingForm.controls['email'].value;
    this.bookingData.mobile=this.purchasingForm.controls['mobile'].value;
    this.bookingData.nationality=this.purchasingForm.controls['nationality'].value;
    console.log('booking Data',this.bookingData); 
  }
  
  onContactValueChanged(contactSelected:string){
    if(contactSelected=='mobile'){
      this.purchasingForm.get('mobile')?.setValidators([Validators.required,Validators.pattern("^(01)?[0-9]{10}$")]);
      this.purchasingForm.get('email')?.setValidators(CustomValidator.domainValidation('gmail.com'));
    }
    else{
      this.purchasingForm.get('mobile')?.setValidators(Validators.pattern("^(01)?[0-9]{10}$"));
      this.purchasingForm.get('email')?.setValidators([Validators.required,CustomValidator.domainValidation('gmail.com')]);
    }
    this.purchasingForm.get('mobile')?.updateValueAndValidity();
    this.purchasingForm.get('email')?.updateValueAndValidity();

  }
  openPopup(){
    this._modalService.open(SuccessPopupComponent);
  }
  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({stripeToken})
        paymentstripe(stripeToken);
      }
    });
    const paymentstripe = (stripeToken: any) => {
      this._FlightsService.makePayment(stripeToken,false).subscribe((data: any) => {
        console.log(data);
        if (data.data === "success") {
          this.openPopup();
        }
        else {
          this.notification.notify=true;
          this.notification.type='failer'
        }
      });
    };
    paymentHandler.open({
      name: 'Travelling',
      description: 'Book A Trip',
      amount: amount * 100
    });
    
  }
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }
}
