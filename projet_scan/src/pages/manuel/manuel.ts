import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DataProvider } from '../../providers/api-scan/api-scan';

@Component({
  selector: 'page-manuel',
  templateUrl: 'manuel.html'
})
export class ManuelPage {

  recipe = {};

  constructor(public navCtrl: NavController, public apiProvider: DataProvider, private alertCtrl: AlertController) {
  }




  AddArticle() {
    let ingredientsSucces = "";
    let ingredientsEchec = "";
    for (let i in this.recipe) {
      if (this.recipe[i] == true) {
        let objAdd = true;
        this.recipe[i] = false;
        let feedLength = 0;
        for (let j in this.apiProvider.feedData) {
          feedLength += 1;
          if (this.apiProvider.feedData[j].name == i) {
            objAdd = false;
          }
        }
        if (objAdd == false) {
          if (ingredientsEchec == "") {
            ingredientsEchec += i;
          } else {
            ingredientsEchec += ', ' + i;
          }

        } else {
          let newFeed = {
            id: feedLength,
            name: i,
          }
          this.apiProvider.addFeedToList(newFeed);
          if (ingredientsSucces == "") {
            ingredientsSucces += i;
          } else {
            ingredientsSucces += ', ' + i;
          }
        }
      }
    }
    this.alerteEchec(ingredientsEchec);
    this.alerteSucces(ingredientsSucces);
  }

  alerteSucces(ingredients) {
    if (ingredients != "") {
      let alert = this.alertCtrl.create({
        title: ingredients + ' added successfully',
        buttons: ['ok']
      });
      alert.present();
    }
  }

  alerteEchec(ingredients) {
    if (ingredients != "") {
      let alert = this.alertCtrl.create({
        title: ingredients + " is/are already in your fridge",
        buttons: ['ok']
      });
      alert.present();
    }
  }


  manuel() {
    let alert = this.alertCtrl.create({
      title: 'Enter manually',
      inputs: [
        {
          name: 'barcode',
          placeholder: 'Enter the barcode',
          type: 'tel'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Validate',
          handler: data => {
            this.apiProvider.codeBarre = data.barcode;
            this.apiProvider.lanceRequette().subscribe(
              (temp) => {
                if (this.apiProvider.wordEn) {
                  let alert = this.alertCtrl.create({
                    title: 'Product found :)',
                    subTitle: this.apiProvider.wordEn,
                    buttons: ['Close']
                  });
                  alert.present();
                  this.navCtrl.parent.select(0);
                }
                else {
                  let alert = this.alertCtrl.create({
                    title: 'Product not found :(',
                    buttons: ['Close']
                  });
                  alert.present();
                }
              }
            );

          }
        }
      ]
    });
    alert.present();
  }

  writeProduct() {
    let alert = this.alertCtrl.create({
      title: 'Enter manually',
      inputs: [
        {
          name: 'product',
          placeholder: 'Enter the product',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Validate',
          handler: data => {
            if (data.product != "") {
              let j = 0;
              for (let i in this.apiProvider.feedData) {
                if (this.apiProvider.feedData[i] != null) {
                  j += 1;
                }
              }
              let existeDeja = false;
              let name=this.apiProvider.removeAccents(data.product);
              for (let i in this.apiProvider.feedData) {
                if (this.apiProvider.feedData[i].name == name) {
                  existeDeja = true;
                }
              }
              if (existeDeja == false) {
                let newFeed = {
                  name: name,
                  id: j
                }
                this.apiProvider.addFeedToList(newFeed);


              } else {
                let alertEror = this.alertCtrl.create({
                  title: name + " is already in your fridge",
                  buttons: ['ok']
                });
                alertEror.present();
              }
              this.navCtrl.parent.select(0);
            }else{
              let alertEror = this.alertCtrl.create({
                title: "Please enter a valid product",
                buttons: ['ok']
              });
              alertEror.present();
            }
            
          }
        }
      ]
    });
    alert.present();
  }


}
