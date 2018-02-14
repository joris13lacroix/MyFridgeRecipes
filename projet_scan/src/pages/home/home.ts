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
  checkboxFields={};// ATTENTION continuer de remplir le tableau si on veux rajoutter des produits dans le html

  constructor(public navCtrl: NavController, public apiProvider : DataProvider) {
    apiProvider.getFeedList().subscribe(data => {
      //console.log(data.feed);
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

  }

  inverse(){
    console.log(this.checkboxFields);
    if(this.checkboxFields[0]==null){
      console.log(this.feedList);
      for (let i in this.feedList){
        console.log(i);
        this.checkboxFields[i]=false;
        console.log(this.checkboxFields[i]);
      }
    }
    console.log(this.checkboxFields);
    for (let i in this.checkboxFields){
      if(this.checkboxFields[i]==true){
        this.checkboxFields[i]=false;
      }else{
        this.checkboxFields[i]=true;
      }
    }
  }
  delete(){
    let valeurCoche=false;
    for(let i in this.checkboxFields){
      if (this.checkboxFields[i]==true){
        valeurCoche=true;
      }
    }
    if(valeurCoche==true){
      this.apiProvider.lancer(this.checkboxFields,this.feedList).subscribe(data => {
        this.feedList = data.feed;
      });
      for (let i in this.checkboxFields){
        if(this.checkboxFields[i]==true){
          this.checkboxFields[i]=false;
        }
      }
    }
  }

  deleteOld(){
    this.apiProvider.deleteFeedList().subscribe(data => {
      this.feedList = data.feed;
    });
    

  }
}
