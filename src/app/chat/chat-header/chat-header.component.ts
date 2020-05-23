import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ChatPreview } from 'src/app/model/chat';
import { Options } from 'src/app/services/options.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatHeaderComponent {

  @Input() preview: ChatPreview;
  @Input() members: string[] = [];

  constructor(
    private ui: UIService,
    private nav: NavController
  ) {}

  onAvatar() {
    this.nav.back();
  }

  onSettings(ev) {
    this.preview.type === 'DM' ?
      this.ui.openOptions(Options.DM, ev) :
      this.ui.openOptions(Options.GROUP, ev);
  }

}
