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
    if (this.feedData.length == 0){
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

  deleteFeedList(): Observable<any>{
    this.storage.set("ingredients",{feed:null});
      return Observable.fromPromise(this.storage.get("ingredients")).mergeMap((val:any) => {
            return this.http.get("assets/data.json").pipe(
              tap ( res => {
                this.feedData = res.feed;
              })
            );
      });
  }
}