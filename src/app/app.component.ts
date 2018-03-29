import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
// import { AuthService } from "./auth/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature='recipe';

  constructor(){}

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyApGmsW1wlxIVoCBxJ8RjBmt6H94sfV-W0",
      authDomain: "ng-recipe-book-73b01.firebaseapp.com"
    });
  }

  onNavigate(feature:string){
    this.loadedFeature=feature;
  }
}
