import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ManuelPage } from '../manuel/manuel';
import { ScanPage } from '../scan/scan';
import { RecettePage } from '../recette/recette';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ManuelPage;
  tab3Root = ScanPage;
  tab4Root = RecettePage;

  constructor() {

  }
}
