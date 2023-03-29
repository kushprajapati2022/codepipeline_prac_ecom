import { Component, OnInit } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data.type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  showLogin = false
  authError:string =''

  constructor(private router:Router,private seller:SellerService){}
  
  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signupSeller(data:SignUp):void{
    // console.log("seller signup info",data)
    this.seller.userSignUpFunction(data)
  }

  LoginSeller(data:Login):void{
    this.authError=""
    console.log("login works",data)
    this.seller.userLoginFunction(data)
    this.seller.isLoginError.subscribe((error)=>{
      if(error){
        this.authError="Email or password is not correct"
      }
    })
  }

  openLogin(){
    this.showLogin = true
  }

  openSignUp(){
    this.showLogin = false
  }
}
