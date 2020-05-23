import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { UIService } from '../services/ui.service';
import { HideHeaderDirective } from '../shared/directives/hide-header.directive';
import { SwipeHandlerDirective } from '../shared/directives/swipe-handler.directive';
import { HomePage } from './home-page/home.page';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  providers: [
    UIService
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    HomePage,
    HideHeaderDirective,
    SwipeHandlerDirective
  ]
})
export class HomePageModule {}
