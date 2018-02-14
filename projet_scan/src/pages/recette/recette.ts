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
    console.log("a la création la recette:",this.recipes);
    if(this.recipes==null){
      console.log("c la bonne condition");
    }
  }

  goRecipe(){
    this.apiProvider.recette.subscribe(data => {
      if(data.count>0){
        this.recipes=data;
        console.log(this.recipes);
        console.log(data.hits[0].recipe.label);
      }
    });
  }

  openDetails(feed) {
    this.navCtrl.push('DetailArticlePage', { feed: feed });
  }
}
