import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
<<<<<<< Updated upstream
  recipe = {}
=======

  cucumber: String;
  stat:boolean;
>>>>>>> Stashed changes

  constructor(public navCtrl: NavController) {
    this.cucumber="concombre";
  }

 
  
<<<<<<< Updated upstream
  goRecipe() {
    console.log(this.recipe)
  }
  
=======
    updateCucumber(monobjet,mystat) {
      if (mystat==true){
      console.log(monobjet);
      }
    }
>>>>>>> Stashed changes
}
