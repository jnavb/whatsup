
import { Directive, OnInit, Input } from '@angular/core';
import { HideHeaderDirective } from './hide-header.directive';
import { HomeView } from '../../home/home-page/home.page';
import { CameraService } from 'src/app/services/camera.service';
import { DomController } from '@ionic/angular';

enum Direction {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3
}

@Directive({
  selector: '[swipeHandler]'
})
export class SwipeHandlerDirective implements OnInit {

  @Input() activeSlideIndex: HomeView;
  @Input() animateHeader: HideHeaderDirective;

  private touchstartX = 0;
  private touchstartY = 0;
  private touchendX = 0;
  private touchendY = 0;
  private firstMove = true;
  private direction: Direction;

  constructor(
    private camera: CameraService,
    private domCtrl: DomController
  ) { }

  ngOnInit() {
    const gestureZone = document.querySelector('ion-slides');

    gestureZone.addEventListener('touchstart', (event) => {
        this.touchstartX = Math.round(event.changedTouches[0].screenX);
        this.touchstartY = Math.round(event.changedTouches[0].screenY);
        this.firstMove = true;
    }, false);

    gestureZone.addEventListener('touchmove', (event) => {
        if (this.firstMove) {
          this.touchendX = Math.round(event.changedTouches[0].screenX);
          this.touchendY = Math.round(event.changedTouches[0].screenY);
          this.firstMove = false;

          this.direction = this.calculateSwipeDirection();
          if (this.direction === Direction.RIGHT && this.activeSlideIndex === HomeView.CHATS) {
            this.domCtrl.write(() => this.camera.activate());
          }
        } else if (this.direction === Direction.RIGHT && this.activeSlideIndex === HomeView.CHATS) {
          this.animateHeader.moveHeaderUp(this.touchendX - Math.round(event.changedTouches[0].screenX));
        } else if (this.direction === Direction.LEFT && this.activeSlideIndex === HomeView.CAMERA) {
          this.animateHeader.moveHeaderDown(this.touchendX - Math.round(event.changedTouches[0].screenX));
        }
    }, false);

    gestureZone.addEventListener('touchend', () => {
      if (this.direction === Direction.UP || this.direction === Direction.DOWN) {
        this.animateHeader.onTouchUpDownEnd();
      } else if (this.direction === Direction.RIGHT && this.activeSlideIndex === HomeView.CHATS) {
        this.animateHeader.showHeadersCompletelyAndAnimate();
      }
  }, false);

  }

  calculateSwipeDirection() {
    const x = this.touchendX - this.touchstartX;
    const y = this.touchendY - this.touchstartY;
    if (this.touchendX < this.touchstartX) {
      // Left Y axis
      if (this.touchendY > this.touchstartY) {
        // Negative X, Negative Y
        return (Math.abs(x) > Math.abs(y) ? Direction.LEFT : Direction.DOWN);
      } else {
        // Negative X, Positive Y
        return (Math.abs(x) > Math.abs(y) ? Direction.LEFT : Direction.UP);
      }
    } else {
      // Right Y axis
      if (this.touchendY > this.touchstartY) {
        // Positive X, Positive Y
        return (Math.abs(x) > Math.abs(y) ? Direction.RIGHT : Direction.DOWN);
      } else {
        // Positvie X, Negative Y
        return (Math.abs(x) > Math.abs(y) ? Direction.RIGHT : Direction.UP);
      }
    }
  }


}
