import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { Chat, ChatPreview } from 'src/app/model/chat';
import { AndroidBackService } from 'src/app/services/back-button.service';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  providers: [DatePipe]
})
export class ChatPage implements OnInit {

  @ViewChild('ionContent', { static: true }) ionContent: IonContent;

  floatingDate;
  preview: ChatPreview;
  chat: Chat;

  constructor(
    private androidBack: AndroidBackService,
    private nav: NavController,
    private router: Router,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.androidBack.onBack(() => this.nav.back());
    this.ionContent.scrollToBottom();

    this.preview = (this.router.getCurrentNavigation().extras.state as ChatPreview);
    if (!this.preview) return;

    this.chatService.getChats$().subscribe(chats => {
      this.chat = chats[this.preview.id];
    });
  }

  onDoubleArrow() {
    this.ionContent.scrollToBottom();
  }

  onDayScrollChange(date: string) {
    this.floatingDate = date;
  }

  onSendMessage(text) {
    this.chat.messages = [
      ...this.chat.messages,
      {
        type: 'TEXT',
        checked: true,
        date: Date.now(),
        text
      }
    ];
    this.ionContent.scrollToBottom();
  }

}
