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
  feedList: any;
  checkboxFields={};

  constructor(public navCtrl: NavController, public apiProvider : DataProvider) {
    apiProvider.getFeedList().subscribe(data => {
      console.log(data.feed);
      this.feedList = data.feed;
    });
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
  
  lancer(){
    for(let i in this.checkboxFields){
      if (this.checkboxFields[i]==true){
      console.log(this.feedList[i].name);
      }
    }
  }

  delete(){
    this.apiProvider.deleteFeedList().subscribe(data => {
      this.feedList = data.feed;
    });
    

  }
}
