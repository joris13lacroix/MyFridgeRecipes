import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/api-scan/api-scan';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'page-recette',
  templateUrl: 'recette.html'
})
export class RecettePage {

  from = 0;
  to = 10;
  recipes: any
  pageActuel = 1;
  pageMax = 0;
  constructor(public navCtrl: NavController, public apiProvider: DataProvider, private alertCtrl: AlertController) {
  }

  goRecipe() {
    this.from = 0;
    this.to = 10;
    this.apiProvider.recette.subscribe(data => {
      if (data.count > 0) {
        this.recipes = data;
        console.log(data);
        this.pageMax = Math.trunc(data.count / 10);
        if (data.count % 10 > 0) {
          this.pageMax += 1;
        }
        this.pageActuel = 1;
      } else {
        let alert = this.alertCtrl.create({
          title: "No recipes found",
          buttons: ['Ok']
        });
        alert.present();
      }
    });
  }


  openDetails(feed) {
    this.navCtrl.push('DetailArticlePage', { feed: feed });
  }

  pageSuivante() {
    if (this.recipes.count >= this.to + 10) {
      this.from += 10;
      this.to += 10;
      this.apiProvider.getRecipes(this.from, this.to).subscribe(data => {
        if (data.count > 0) {
          this.recipes = data;
        }
      });
      this.pageActuel += 1;
    } else {
      this.alerteSuivant();
    }
  }

  alerteSuivant() {
    let alert = this.alertCtrl.create({
      title: "You already are on the last page",
      buttons: ['Ok']
    });
    alert.present();
  }

  pagePrecedente() {
    if (this.from - 10 >= 0) {
      this.from -= 10;
      this.to -= 10;
      this.apiProvider.getRecipes(this.from, this.to).subscribe(data => {
        if (data.count > 0) {
          this.recipes = data;
        }
      });
      this.pageActuel -= 1;
    } else {
      this.alertePrecedente();
    }
  }

  alertePrecedente() {
    let alert = this.alertCtrl.create({
      title: "You already are on the first page",
      buttons: ['Ok']
    });
    alert.present();
  }

  ionViewWillEnter() {
    if (this.apiProvider.recette != null) {
      this.goRecipe();
    }

  }

}
