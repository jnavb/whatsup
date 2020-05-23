import { Injectable } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';
import { ChatPreview } from '../model/chat';
import { OptionListComponent } from '../components/option-list/option.component';
import { OptionsService, Options } from './options.service';

@Injectable()
export class UIService {

  constructor(
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
    private options: OptionsService
  ) { }

  async profilePreview(a: ClientRect, { img, type, title }: ChatPreview) {
    const groupButtons = `
      <div class="icon-btn ion-activatable">
        <ion-ripple-effect type="unbounded"></ion-ripple-effect>
        <ion-icon name="chatbox-ellipses-sharp"></ion-icon>
      </div>
      <div class="icon-btn icon-btn--info  ion-activatable">
        <ion-ripple-effect type="unbounded"></ion-ripple-effect>
        <ion-icon name="information-circle-outline"></ion-icon>
      </div>`;
    const dmButtons = `
      <div class="icon-btn ion-activatable">
        <ion-ripple-effect type="unbounded"></ion-ripple-effect>
        <ion-icon name="chatbox-ellipses-sharp"></ion-icon>
      </div>
      <div class="icon-btn ion-activatable">
        <ion-ripple-effect type="unbounded"></ion-ripple-effect>
        <ion-icon name="call-sharp"></ion-icon>
      </div>
      <div class="icon-btn ion-activatable">
        <ion-ripple-effect type="unbounded"></ion-ripple-effect>
        <ion-icon name="videocam"></ion-icon>
      </div>
      <div class="icon-btn icon-btn--info  ion-activatable">
        <ion-ripple-effect type="unbounded"></ion-ripple-effect>
        <ion-icon name="information-circle-outline"></ion-icon>
      </div>`;

    const profilePos = {
      x: window.innerWidth / 2 + 1,
      y: 230
    };
    const avatarPos = {
      x: a.left + a.width / 2,
      y: a.top + a.height / 2
    };

    const alert = await this.alertCtrl.create({
      message: `
      <div class="preview">
        <div class="preview__content">
          <div class="preview__name">${title}</div>
          <div class="preview__image">
            <img src="${img}"/>
          </div>
        </div>
        <div class="preview__buttons">
          ${type === 'DM' ? dmButtons : groupButtons}
        </div>
      </div>`,
      cssClass: 'preview-alert-content',
      enterAnimation: (baseEl) => {
        const backdropAnimation = createAnimation()
          .addElement(baseEl.querySelector('ion-backdrop'))
          .duration(250)
          .easing('ease-out')
          .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

        const wrapperAnimation = createAnimation()
          .addElement(baseEl.querySelector('.alert-wrapper'))
          .duration(250)
          .easing('ease-out')
          .keyframes([
            {
              offset: 0,
              opacity: '1',
              transform: `translateX(${avatarPos.x - profilePos.x}px) translateY(${avatarPos.y - profilePos.y}px) scale(.18)`,
              borderRadius: '50%'
            },
            { offset: .85, borderRadius: '0px' },
            {
              offset: 1,
              opacity: '1',
              transform: 'translateX(0) translateY(0px) scale(1)',
              borderRadius: '0px'
            }
          ]);

        return createAnimation()
          .addElement(baseEl)
          .addAnimation([wrapperAnimation, backdropAnimation]);
        },
        leaveAnimation: (baseEl) => {
          const backdropAnimation = createAnimation()
            .addElement(baseEl.querySelector('ion-backdrop'))
            .duration(250)
            .easing('ease-out')
            .fromTo('opacity', 'var(--backdrop-opacity)', '0.01');

          const wrapperAnimation = createAnimation()
            .addElement(baseEl.querySelector('.alert-wrapper'))
            .duration(250)
            .easing('ease-out')
            .keyframes([
              {
                offset: 0,
                opacity: '1',
                transform: 'translateX(0) translateY(0px) scale(1)',
                borderRadius: '0px'
              },
              { offset: .85, borderRadius: '0px' },
              {
                offset: 1,
                opacity: '1',
                transform: `translateX(${avatarPos.x - profilePos.x}px) translateY(${avatarPos.y - profilePos.y}px) scale(.18)`,
                borderRadius: '50%'
              }
            ]);

          return createAnimation()
            .addElement(baseEl)
            .addAnimation([wrapperAnimation, backdropAnimation]);
          }
      });

    await alert.present();
  }

  async openOptions(type: Options, event) {
    const popover = await this.popoverCtrl.create({
      component: OptionListComponent,
      componentProps: {
        opts: this.options.retrieveData(type)
      },
      event,
      cssClass: 'custom-options',
      keyboardClose: true,
      showBackdrop: false
    });

    return popover.present();
  }

}
