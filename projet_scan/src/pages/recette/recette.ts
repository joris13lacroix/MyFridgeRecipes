import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/api-scan/api-scan';

@Component({
  selector: 'page-recette',
  templateUrl: 'recette.html'
})
export class RecettePage {

  constructor(public navCtrl: NavController, public apiProvider : DataProvider) {
    this.rechercheRecette();
  }

  rechercheRecette(){
    this.apiProvider.getRecipes().subscribe(data => {
      console.log(data);
      
    })
  }
}
