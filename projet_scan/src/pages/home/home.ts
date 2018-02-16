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


  constructor(public navCtrl: NavController, public apiProvider : DataProvider,private alertCtrl: AlertController) {

  }

 
  
  goRecipe() {
    this.maRecherche="";
    for(let i in this.recipe){
      if (this.recipe[i]==true){
        if(this.maRecherche!=""){
          this.maRecherche+=', '+i;
        }
        else{
          this.maRecherche+=i;
        }
      
      this.apiProvider.recipes = this.maRecherche;
      }
    }
    console.log(this.maRecherche);
  }
  
  goToRecette() {
    this.navCtrl.parent.select(3);
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm ingredients :',
      message: this.apiProvider.recipes,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Validate',
          handler: () => {
            this.goToRecette();
          }
        }
      ]
    });
    alert.present();
  }

  
}
