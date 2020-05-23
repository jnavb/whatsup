import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, IonContent, IonSlide, IonSlides, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Calls, ChatPreview, Status } from '../../model/chat';
import { CameraService } from '../../services/camera.service';
import { ChatService } from '../../services/chat.service';
import { HeaderService } from '../../services/header.service';
import { Options } from '../../services/options.service';
import { UIService } from '../../services/ui.service';
import { HideHeaderDirective } from '../../shared/directives/hide-header.directive';

export enum HomeView {
  CAMERA = 0,
  CHATS = 1,
  STATUS = 2,
  CALLS = 3
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  @ViewChild('slides', { static: true }) slides: IonSlides;
  @ViewChild('cameraSlide', { static: true }) cameraSlide: IonSlide;
  @ViewChild('animateHeader', { static: true }) animateHeader: HideHeaderDirective;
  @ViewChild('contentChat', { static: true }) contentChat: IonContent;

  searchText = '';
  calls$: Observable<Calls[]>;
  status$: Observable<Status>;

  set activeSegment(view) {
    this._activeSegment = + view;
    this.slides.slideTo(this.activeSegment);
  }

  get activeSegment() {
    return this._activeSegment;
  }

  get activeSlide() {
    return this._activeSlide;
  }

  fabOpts = [
    {
      segment: 0,
      hide: true
    },
    {
      segment: 1,
      name: 'chatbox-ellipses-sharp'
    },
    {
      segment: 2,
      src: 'assets/icons/camera.svg'
    },
    {
      segment: 3,
      name: 'call'
    },
  ];

  unreadMessages = 0;

  get chatsPreview() {
    return this.searchText === '' ? this._chatsPreview : this._chatsResult;
  }

  private _activeSegment = 1;
  private _activeSlide = 1;
  private _chatsPreview: ChatPreview[] = [];
  private _chatsResult: ChatPreview[] = [];

  constructor(
    public alertCtrl: AlertController,
    private chatService: ChatService,
    private ui: UIService,
    private nav: NavController,
    private camera: CameraService,
    private headerService: HeaderService,
    private renderer: Renderer2,
    private statusBar: StatusBar
  ) {}

  ngOnInit() {
    this.calls$ = this.chatService.getCalls$();
    this.status$ = this.chatService.getStatus$();
    this.chatService.getPreviews$().subscribe(previews => {
      this._chatsPreview = previews;
      this.unreadMessages = previews.reduce((acc, {newMessages}) => acc + newMessages, 0);
    });
  }

  onSearch(text) {
    this.searchText = text; // needed?
    this._chatsResult = this._chatsPreview
    .map(preview => (
      {
        ...preview,
        searchResult: preview.title.match(new RegExp(text, 'i'))
      }
    ))
    .filter(preview => preview.searchResult);
  }

  onChat(i) {
    this.headerService.notifySearchbar(false);
    const state = this.chatsPreview[i];
    this.nav.navigateForward(['chat', i], { state });
  }

  onStatus() {
    this.headerService.notifySearchbar(false);
  }

  onCall() {
    this.headerService.notifySearchbar(false);
  }

  async ionSlideWillChange() {
    if (this._activeSlide === HomeView.CAMERA) {
      this.contentChat.scrollToTop();
      this.animateHeader.showHeadersCompletelyAndAnimate();
    }

    this._activeSlide = + await this.slides.getActiveIndex();
    this._activeSegment = this._activeSlide;


    if (this._activeSlide === HomeView.CAMERA) {
      setTimeout(() => this.camera.activate(), 400);
      this.animateHeader.hideHeadersCompletelyAndAnimate();
    } else {
      this.animateHeader.onSlideChange();
    }

    if (this._activeSlide !== HomeView.CHATS) {
      this.renderer.setStyle((this.slides as any).el , 'height', 'calc(100vh)');
      const statusSlide = document.querySelectorAll('ion-slide')[HomeView.STATUS];
      this.renderer.setStyle(statusSlide, 'height', '100vh');
    } else {
      this.renderer.setStyle((this.slides as any).el, 'height', 'calc(100vh + 50px');
      const statusSlide = document.querySelectorAll('ion-slide')[HomeView.STATUS];
      this.renderer.setStyle(statusSlide, 'height', '100%');
    }
  }

  async ionSlideDidChange() {
    this._activeSlide = + await this.slides.getActiveIndex();
  }

  onSettings(ev) {
    this.ui.openOptions(Options.PREVIEW, ev);
  }

  ionSlideTouchEnd() {
    setTimeout(() => {
      if (this._activeSlide === HomeView.CHATS) {
        this.camera.deactivate();
      }
    }, 400);
  }

}
