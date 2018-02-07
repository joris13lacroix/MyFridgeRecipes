import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/api-scan/api-scan'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  codeBarre:String;
  scanData : {};
  options : BarcodeScannerOptions;
  produit: any;
  recette:any;
  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner,private alertCtrl: AlertController, public apiProvider : DataProvider) {
    this.codeBarre='3068320099651';
  }
  scan(){
    this.options = {
        prompt : "Scan your barcode "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        console.log(barcodeData);
        this.codeBarre=barcodeData.text;
        let alert = this.alertCtrl.create({
          title: 'product found :)',
          subTitle: barcodeData.text,
          buttons: ['Dismiss']
        });
        alert.present();
    }, (err) => {
        console.log("Error occured : " + err);
        let alert = this.alertCtrl.create({
          title: 'product not found :(',
          buttons: ['Dismiss']
        });
        alert.present();
    });         
  }

  lanceRequette(){
    this.apiProvider.getProduct(this.codeBarre).subscribe(data => {
      //console.log(data);
      if (data.status==1){
        if(data.product.generic_name=="" || data.product.generic_name==null){
          this.produit = data.product.product_name;
        }else{
          this.produit = data.product.generic_name;
        }
      //console.log(this.produit);
      }else{
        let alert = this.alertCtrl.create({
          title: 'product not found :(',
          buttons: ['Dismiss']
        });
        alert.present();
      }
      })
  }

  rechercheRecette(){
    console.log(this.produit);
    this.apiProvider.getRecipes('chicken').subscribe(data => {
      console.log(data);
      if (data.count>0){
        //this.recette = data.product.product_name;
      }
      
    })
  }
}
