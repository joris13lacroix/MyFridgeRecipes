import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/api-scan/api-scan';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-manuel',
  templateUrl: 'manuel.html'
})
export class ManuelPage {

  feedList: any;
  recipe = {};

  constructor(public navCtrl: NavController,  public apiProvider : DataProvider, private alertCtrl: AlertController) {
  }


  

  AddArticle(){
    this.apiProvider.getFeedList().subscribe(data => {
      this.feedList = data.feed;
    });
      for(let i in this.recipe){
        if (this.recipe[i]==true){
          let objAdd=true;
          this.recipe[i]=false;
          let feedLength=0;
          for(let j in this.feedList){
            feedLength+=1;
            if(this.feedList[j].name==i){
              objAdd=false;
            }
          }
          if(objAdd==false){
            this.alerteEchec(i);
          }else{
            let newFeed={
              id: feedLength,
              name: i,
            }
            this.apiProvider.addFeedToList(newFeed);
          }
        }
      }
      /*
      
      this.alerteSucces();

      this.alerteEchec();*/
  }

  alerteSucces() {
    let alert = this.alertCtrl.create({
      title: 'ingrédient ajoutée avec succès',
      buttons: ['ok']
    });
    alert.present();
  }

  alerteEchec(i) {
    let alert = this.alertCtrl.create({
      title: "L'ingrédient "+i+" est deja existant dans votre frigo",
      buttons: ['ok']
    });
    alert.present();
  }
}
