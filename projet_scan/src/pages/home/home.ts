import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/api-scan/api-scan';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  recipe = {};
  maRecherche:String;

  constructor(public navCtrl: NavController, public apiProvider : DataProvider) {
  }

 
  
  goRecipe() {
    this.maRecherche="";
    for(let i in this.recipe){
      if (this.recipe[i]==true){
      this.maRecherche+=i+',';
      this.apiProvider.recipes = this.maRecherche;
      }
    }
    console.log(this.maRecherche);
  }
  
}
