import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/api-scan/api-scan';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  recipe = {};
  maRecherche:String;
  feedList= [];
  from=0;
  to=10;
  checkboxFields={};// ATTENTION continuer de remplir le tableau si on veux rajoutter des produits dans le html

  constructor(public navCtrl: NavController, public apiProvider : DataProvider, private alertCtrl: AlertController) {
    apiProvider.getFeedList().subscribe(data => {
      this.feedList = data.feed;
      
    });
  }

 
  
  goRecipe() {
    let valeurCoche=false;
    for(let i in this.checkboxFields){
      if (this.checkboxFields[i]==true){
        valeurCoche=true;
      }
    }
    if(valeurCoche==true){
      this.maRecherche="";
      for(let i in this.feedList){
        if (this.checkboxFields[i]==true){
        this.maRecherche+=this.feedList[i].name+',';
        }
      }
      this.apiProvider.recipes = this.maRecherche;
      this.apiProvider.getRecipes(this.from,this.to).subscribe(data => {
        if(data.count>0){
          this.recipe=data;
        }
      });
      this.navCtrl.parent.select(3);
    }else{
      this.alerteEchec();
    }
  }

  inverse(){
    let valeurExistante=false
    for (let i in this.feedList){
      valeurExistante=true
    }
    if(valeurExistante==true){
      for(let i in this.feedList){
        if(this.checkboxFields[i]==null){
            this.checkboxFields[i]=false;
        }
      }
      for (let i in this.checkboxFields){
        if(this.checkboxFields[i]==true){
          this.checkboxFields[i]=false;
        }else{
          this.checkboxFields[i]=true;
        }
      }
    }
  }

  delete(){
    let valeurExistante=false
    for (let i in this.feedList){
      valeurExistante=true
    }
    if(valeurExistante==true){
      let valeurCoche=false;
      for(let i in this.checkboxFields){
        if (this.checkboxFields[i]==true){
          valeurCoche=true;
        }
      }
      if(valeurCoche==true){
        //mettre l'alerte pour confirmer la suppression ici
        this.apiProvider.delete(this.checkboxFields,this.feedList).subscribe(data => {
          this.feedList = data.feed;
        });
        for (let i in this.checkboxFields){
          if(this.checkboxFields[i]==true){
            this.checkboxFields[i]=false;
          }
        }
      }
    }
  }

  alerteEchec() {
    let alert = this.alertCtrl.create({
      title: "pas d'ingrédient sélectioné",
      buttons: ['ok']
    });
    alert.present();
  }
}
