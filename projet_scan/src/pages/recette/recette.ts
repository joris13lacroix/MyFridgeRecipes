import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/api-scan/api-scan';

@Component({
  selector: 'page-recette',
  templateUrl: 'recette.html'
})
export class RecettePage {

  recipes:any
  constructor(public navCtrl: NavController, public apiProvider : DataProvider) {
  }

  goRecipe(){
    this.apiProvider.recette.subscribe(data => {
      if(data.count>0){
        this.recipes=data;
      }
    });
  }

  openDetails(feed) {
    this.navCtrl.push('DetailArticlePage', { feed: feed });
  }
}
