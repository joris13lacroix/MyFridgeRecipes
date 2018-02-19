import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/Observable/of'
import { tap } from 'rxjs/Operators';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  debutChaineProduit : String;
  finChaineProduit : String;
  debutChaineRecette : String;
  milieuChaineRecette : String;
  finChaineRecette1 : String;
  finChaineRecette2 : String;
  produit: Observable<any>;
  recette: Observable<any>;
  recipes:any;

  codeBarre:String;
  scanData : {};
  produit2: any;
  recette2:any;
  wordEn:any;
  


  feedData:any;
  constructor(public http: HttpClient, public httpClient: HttpClient, private storage: Storage) {
    this.debutChaineProduit='https://world.openfoodfacts.org/api/v0/product/';
    this.finChaineProduit='.json';
    this.debutChaineRecette='https://api.edamam.com/search?q=';
    this.finChaineRecette1='&app_id=0d6a8756&app_key=ce315d29c1aaa6a7d26dc963e067aa08&from=';
    this.finChaineRecette2='&to='
    this.feedData=[];
  }

  getProduct(codeBarre): Observable<any>{
    this.produit = this.http.get(this.debutChaineProduit + codeBarre + this.finChaineProduit);
    return this.produit;
  }
  
  getRecipes(from,to): Observable<any>{
    this.recette = this.http.get(this.debutChaineRecette + this.recipes + this.finChaineRecette1 + from + this.finChaineRecette2 + to);
    return this.recette;
  }

  lanceRequette():Observable<any>{

    return this.getProduct(this.codeBarre).pipe(tap((data) => {
      //console.log(data);
      this.wordEn = null;
      if (data.status==1){
        if(data.product.generic_name=="" || data.product.generic_name==null){
          this.produit2 = this.removeAccents(data.product.product_name);
        }
        else{
          this.produit2 = this.removeAccents(data.product.generic_name);
        }
      this.findKeyWords(this.produit2).subscribe(
        (tmp)=>{
          return tmp;
        }
      );
      //console.log(this.produit);
      }else{
        return of({error:true});
      }
      }))
      //return this.wordEn;
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
    //console.log(str.join('').toLowerCase());
    return (str.join('').toLowerCase());
  }

findKeyWords(scan):Observable<any>{
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
    ['bœuf','beef']

  ]

    for(var product in products){
      if(scan.indexOf(products[product][0]) != -1){
        //this.produit = products[product][0];
        this.wordEn = products[product][1];
        console.log('keywords found:',this.wordEn);
      }
     else{
        console.log('no keywords found ');
      }
    }
    return of(this.wordEn);
    
}
 
  getFeedList(): Observable<any>{
    let j=0;
    for (let i in this.feedData){
      j+=1;
    }
    if (j == 0){
      return Observable.fromPromise(this.storage.get("ingredients")).mergeMap((val:any) => {
          if (val == null || val.feed == null) {
            return this.http.get("assets/data.json").pipe(
              tap ( res => {
                this.feedData = res.feed;
              })
            );
          } else {
            this.feedData = val.feed;
            return of({feed:this.feedData});
          }
      });
    } else {
      
      return of({feed:this.feedData});
    }
  }

  addFeedToList(newFeed){
    this.feedData.push(newFeed);
    this.storage.set("ingredients",{feed:this.feedData});
  }

  delete(checkboxFields,feedData):Observable<any>{
    let feedList2=[];
    let feedList3=[];
    let j=0;
    let name="";
    for(let i in checkboxFields){
      if (feedData[i]!=null){
        if (checkboxFields[i]==true ){
          
          name= feedData[i].name;
          feedList2[j]={
            id:j,
            name : name}
          j+=1;
        }
      }
    }
    j=0;
    for(let i in feedData){
      let aSupprimer=false;
      for(let k in feedList2){
        if (feedData[i].name == feedList2[k].name){
          aSupprimer=true;
        }
      }
      if(aSupprimer==false){
        feedList3[j]=feedData[i];
        feedList3[j].id=j;
        j+=1;
      }
    }
    this.feedData=feedList3;
    this.storage.set("ingredients",{feed:this.feedData});
    return of({feed:this.feedData});
  }
}