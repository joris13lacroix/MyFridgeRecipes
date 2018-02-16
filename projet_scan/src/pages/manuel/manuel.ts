import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DataProvider } from '../../providers/api-scan/api-scan';

@Component({
  selector: 'page-manuel',
  templateUrl: 'manuel.html'
})
export class ManuelPage {

  constructor(public navCtrl: NavController,private alertCtrl: AlertController,public apiProvider : DataProvider) {

  }

  manuel(){
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
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Validate',
          handler: data => {
            console.log('code: ',data.barcode);
            this.apiProvider.codeBarre = data.barcode;
            this.apiProvider.lanceRequette();

          }
        }
      ]
    });
    alert.present();
  }

  

}
