import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailArticlePage } from './detail-article';

@NgModule({
  declarations: [
    DetailArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailArticlePage),
  ],
})
export class DetailArticlePageModule {}
