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
  produit: any;
  recette:any;
  wordEn:any;


  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner,private alertCtrl: AlertController, public apiProvider : DataProvider) {
    this.codeBarre='3068320099651';
  }

  scan(){
    this.options = {
        prompt : "Scan your barcode "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        this.codeBarre=barcodeData.text;
        let alert = this.alertCtrl.create({
          title: 'product found :)',
          subTitle: barcodeData.text,
          buttons: ['Close']
        });
        alert.present();
        this.lanceRequette();  
    }, (err) => {
        console.log("Error occured : " + err);
        let alert = this.alertCtrl.create({
          title: 'product not found :(',
          buttons: ['Close']
        });
        alert.present();
    });   
        
  }

  lanceRequette(){
    this.apiProvider.getProduct(this.codeBarre).subscribe(data => {
      if (data.status==1){
        if(data.product.generic_name=="" || data.product.generic_name==null){
          this.produit = this.removeAccents(data.product.product_name);
          this.findKeyWords(this.produit);
        }
        else{
          this.produit = this.removeAccents(data.product.generic_name);
          this.findKeyWords(this.produit);
        }
      }else{
        let alert = this.alertCtrl.create({
          title: 'product not found :(',
          buttons: ['Dismiss']
        });
        alert.present();
      }
      })
  }


  removeAccents(str) {
    let accents = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    let accentsOut = "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    str = str.split('');
    str.forEach((letter, index) => {
      let i = accents.indexOf(letter);
      if (i != -1) {
        str[index] = accentsOut[i];
      }
    })
    console.log(str.join('').toLowerCase());
    return (str.join('').toLowerCase());
  }

findKeyWords(scan){
  
  var products = [
    ['ail','garlic'],
    ['algues marines','seaweed'],
    ['asperge','asparagus'],
    ['aubergine','eggplant'],
    ['betterave','beet'],
    ['bette','bette'],
    ['brocoli','broccoli'],
    ['carotte','carrot'],
    ['celeri','celery'],
    ['champignons','mushrooms'],
    ['chlorelle','chlorella'],
    ['chou','cabbage'],
    ['chou frise','kale'],
    ['chou fleur','cauliflower'],
    ['chou rave','kohlrabi'],
    ['choux de bruxelles','brussels sprouts'],
    ['citrouille','pumpkin'],
    ['concombre','cucumber'],
    ['courge','squash'],
    ['cresson de fontaine','watercress'],
    ['radis blanc','daikon'],
    ['feuillage de moutarde','mustard foliage'],
    ['feuille de luzerne verte','green alfalfa leaf'],
    ['feuille de chou rosette','rosette leaf'],
    ['germination','germination'],
    ['laitue','lettuce'],
    ['legumes fermentes','fermented vegetables'],
    ['oignon','onion'],
    ['panais','parsnip'],
    ['pissenlit, fleur comestible','dandelion, edible flower'],
    ['pois','peas'],
    ['poivron','pepper'],
    ['rutabaga','rutabaga'],
    ['abricot','apricot'],
    ['avocat','lawyer'],
    ['banane','banana'],
    ['bleuet','cornflower'],
    ['cantaloup','cantaloupe'],
    ['cerise','cherry'],
    ['dattes','dates'],
    ['figue','fig'],
    ['fraise','strawberry'],
    ['framboise','raspberry'],
    ['fruits tropicaux','tropical fruits'],
    ['groseille','currant'],
    ['mandarine','mandarin'],
    ['melon d eau','watermelon'],
    ['melon miel','honeydew melon'],
    ['mure','blackberry'],
    ['nectarine','nectarine'],
    ['pamplemousse','grapefruit'],
    ['peche','peach'],
    ['poire','perry'],
    ['pomme','apple'],
    ['raisin','grapes'],
    ['tomate','tomato'],
    ['amandes','almonds'],
    ['graines de citrouille','pumpkin seeds'],
    ['graines de courge','squash seeds'],
    ['graines de lin','linseed'],
    ['graines de tournesol','sun-flower seeds'],
    ['graines et noix germees','seeds and sprouted nuts'],
    ['marron','brown'],
    ['cannelle','cinnamon'],
    ['curry','curry'],
    ['gingembre','ginger'],
    ['moutarde','mustard'],
    ['piment rouge','red pepper'],
    ['sel','salt'],
    ['miso','miso'],
    ['tamari','tamari'],
    ['eau','water'],
    ['jus de fruits','juice'],
    ['jus de legumes','vegetable juice'],
    ['agave','agave'],
    ['sirop erable','maple syrup'],
    ['ginseng','ginseng'],
    ['kombucha','kombucha'],
    ['rooibos','rooibos'],
    ['the bancha','bancha tea'],
    ['the vert','green tea'],
    ['tisane de pissenlit','dandelion tea'],
    ['tisanes','herbal teas'],
    ['yerba mate','yerba mate'],
    ['beurre','butter'],
    ['creme fraiche epaisse','thick cream'],
    ['creme fraiche legere','light cream'],
    ['creme glacee','ice cream'],
    ['creme fraiche','fresh cream'],
    ['fromages de brebis','sheep cheese'],
    ['fromages de chevre','goat cheeses'],
    ['fromages de vache','cow cheese'],
    ['lait','milk'],
    ['ananas','pineapple'],
    ['canneberges','cranberries'],
    ['citron','lemon'],
    ['kiwi','kiwi'],
    ['citron vert','lime'],
    ['orange','orange'],
    ['huile avocat','avocado oil'],
    ['huile de canola','canola oil'],
    ['huile de carthame','safflower oil'],
    ['huile de graines de sesame','sesame seed oil'],
    ['huile de chanvre','hemp oil'],
    ['huile de lin','linseed oil'],
    ['huile de mais','corn oil'],
    ['huile de pepins de raisins','grape seed oil'],
    ['huile de sesame ','sesame oil'],
    ['huile de tournesol','sunflower oil'],
    ['huile olive','olive oil'],
    ['saindoux','lard'],
    ['amarante','amaranth'],
    ['avoine','oat'],
    ['ble','corn'],
    ['epeautre','spelled'],
    ['farine de graines de chanvre','hemp seed meal'],
    ['kamut','kamut'],
    ['mais','corn'],
    ['orge','barley'],
    ['quinoa','quinoa'],
    ['riz','rice'],
    ['sarrasin','buckwheat'],
    ['seigle','rye'],
    ['noisette','hazelnut'],
    ['feves blanches','white beans'],
    ['feves de lima','lima beans'],
    ['feves de soja','soy beans'],
    ['feves et lÈgumineuses','beans and legumes'],
    ['feves noires','black beans'],
    ['feves pinto','pinto beans'],
    ['feves rouges','red beans'],
    ['lait de soja','soy milk'],
    ['lentilles','lentils'],
    ['noix de cajou','cashew nut'],
    ['noix de grenoble','walnuts'],
    ['noix du brÈsil','brazil nut'],
    ['pacanes','pecans'],
    ['pois chiches','chickpeas'],
    ['pois verts','green peas'],
    ['tahini','tahini'],
    ['tofu','tofu'],
    ['agneau','lamb'],
    ['canard','duck'],
    ['crevettes','shrimps'],
    ['dinde','turkey'],
    ['gibier','game'],
    ['homard','lobster'],
    ['huitres','oysters'],
    ['lapin','rabbit'],
    ['moules','molds'],
    ['palourdes','clams'],
    ['petoncles','scallops'],
    ['poisson','fish'],
    ['poulet','chicken'],
    ['porc','pork'],
    ['levure de biere','yeast'],
    ['levure de boulangerie','baker yeast'],
    ['pommes de terre','potatoes'],
    ['vinaigre','vinegar'],
    ['biere','beer'],
    ['liqueurs','liqueurs'],
    ['spiritueux','liquor'],
    ['vin','wine'],
    ['miel','honey'],
    ['sucre','sugar'],
    ['oeuf', 'egg'],
    ['sauce tomate','tomato sauce'],
    ['coulis de tomate', 'tomato coulis'],
    ['mayonnaise','mayonnaise'],
    ['ketchup','ketchup'],
    ['moutarde','mustard'],
    ['œufs','eggs'],
    ['oeufs','eggs'],
    ['bœuf','beef'],
    ['coca','coca']

  ]

    for(var product in products){
      if(scan.indexOf(products[product][0]) != -1){
        //this.produit = products[product][0];
        this.wordEn = products[product][1];
        console.log('keywords found');
      }
     else{
        console.log('no keywords found ');
      }
    }
  

}


}
