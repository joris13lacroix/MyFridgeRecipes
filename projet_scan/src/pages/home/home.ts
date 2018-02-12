import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  recipe = {}

  constructor(public navCtrl: NavController) {
    
  }

  
  goRecipe() {
    console.log(this.recipe)
  }
  
}
