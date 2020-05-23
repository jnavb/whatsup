import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { UIService } from '../services/ui.service';
import { ChatArrowComponent } from './chat-arrow/chat-arrow.component';
import { ChatBackComponent } from './chat-back/chat-back.component';
import { ChatDateComponent } from './chat-date/chat-date.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatMessageWrapperComponent } from './chat-message-wrapper/chat-message-wrapper.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatPage } from './chat-page/chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';
import { SameMinutePipe } from './pipes/same-minute.pipe';
import { DifferentDayPipe } from './pipes/different-day.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatRoutingModule,
    ComponentsModule
  ],
  declarations: [
    ChatHeaderComponent,
    ChatBackComponent,
    ChatInputComponent,
    ChatMessageComponent,
    ChatDateComponent,
    ChatArrowComponent,
    ChatMessageWrapperComponent,
    ChatPage,
    SameMinutePipe,
    DifferentDayPipe
  ],
  exports: [
    ChatHeaderComponent,
    ChatBackComponent,
    ChatInputComponent,
    ChatMessageComponent,
    ChatDateComponent,
    ChatArrowComponent,
    ChatMessageWrapperComponent,
    ChatPage
  ],
  providers: [
    UIService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class ChatModule {}
