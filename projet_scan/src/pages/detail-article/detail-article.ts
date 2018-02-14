import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-article',
  templateUrl: 'detail-article.html',
})
export class DetailArticlePage {

  feed: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.feed = this.navParams.get('feed');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailArticlePage');
  }

  
  

}
