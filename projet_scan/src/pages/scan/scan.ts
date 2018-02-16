import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/api-scan/api-scan';


@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {
  codeBarre:String;
  scanData : {};
  options : BarcodeScannerOptions;
  error : any;
  ingredient: any;
  
  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner,private alertCtrl: AlertController, public apiProvider : DataProvider) {
    this.codeBarre='306832009961';
  }

  scan(){
    this.options = {
        prompt : "Scan your barcode "
    }

    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        console.log(barcodeData);
        this.apiProvider.codeBarre=barcodeData.text;

        this.apiProvider.lanceRequette().subscribe(
          (temp) =>{
            if(this.apiProvider.wordEn){
              let alert = this.alertCtrl.create({
                title: 'Product found :)',
                subTitle: this.apiProvider.wordEn,
                buttons: ['Close']
              });
              alert.present();
            }
            else{
              let alert = this.alertCtrl.create({
                title: 'Product not found :(',
                buttons: ['Close']
              });
              alert.present();
            }
          }
        );

    }, (err) => {
        console.log("Error occured : " + err);
        let alert = this.alertCtrl.create({
          title: 'Product not found :(',
          buttons: ['Close']
        });
        alert.present();
    });  
  }
  


}
