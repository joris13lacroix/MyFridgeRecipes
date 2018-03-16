import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/api-scan/api-scan';


@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {
  codeBarre: String;
  scanData: {};
  options: BarcodeScannerOptions;
  error: any;
  ingredient: any;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private alertCtrl: AlertController, public apiProvider: DataProvider) {
    this.codeBarre = null;
  }

  scan() {
    
    this.options = {
      prompt: "Scan your barcode "
    }

    this.barcodeScanner.scan(this.options).then((barcodeData) => {

      console.log(barcodeData);
      if(barcodeData.text!=""){
      this.apiProvider.codeBarre = barcodeData.text;

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
          } else {
            let alert = this.alertCtrl.create({
              title: 'Product not found :(',
              buttons: ['Close']
            });
            alert.present();
            this.navCtrl.parent.select(0);
          }
        }
      );
    }else{
      let alert = this.alertCtrl.create({
        title: 'Product not found :(',
        buttons: ['Close']
      });
      alert.present();
      this.navCtrl.parent.select(0);
    }

    }, (err) => {
      console.log("Error occured : " + err);
      let alert = this.alertCtrl.create({
        title: 'Product not found :(',
        buttons: ['Close']
      });
      alert.present();
      this.navCtrl.parent.select(0);
    });
  }

  ionViewWillEnter() {
    this.scan();
  }



}
