import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/Observable/of';
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
  finChaineRecette : String;
  produit: Observable<any>;
  recette: Observable<any>;
  recipes:any;
  feedData:any;
  constructor(public http: HttpClient, public httpClient: HttpClient, private storage: Storage) {
    this.debutChaineProduit='https://world.openfoodfacts.org/api/v0/product/';
    this.finChaineProduit='.json';
    this.debutChaineRecette='https://api.edamam.com/search?q=';
    this.finChaineRecette='&app_id=0d6a8756&app_key=ce315d29c1aaa6a7d26dc963e067aa08&from=0&to=5';
    this.feedData=[];
  }

  getProduct(codeBarre): Observable<any>{
    this.produit = this.http.get(this.debutChaineProduit + codeBarre + this.finChaineProduit);
    return this.produit;
  }
  
  getRecipes(): Observable<any>{
    this.recette = this.http.get(this.debutChaineRecette + this.recipes + this.finChaineRecette);
    return this.recette;
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
      if (checkboxFields[i]==true ){
        
        name= feedData[i].name;
        feedList2[j]={
          id:j,
          name : name}
        j+=1;
      }
    }
    j=0;
    for(let i in feedData){
      let aSupprimer=false;
      for(let j in feedList2){
        if (feedData[i].name == feedList2[j].name){
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