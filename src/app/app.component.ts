import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-irfan',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Irfanul Hasan';
  env = environment.production;
  workTab = "panel-0";
  href = "";
  constructor() {
    if(this.env){
      this.href = "Portfolio";
    }
  }

  funWorkTab(name:string): void{
    this.workTab = name;
  }
}
