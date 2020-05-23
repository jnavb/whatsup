import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AudioPipe } from '../shared/pipes/audio.pipe';
import { DateChatPreviewPipe } from '../shared/pipes/date-chat-preview.pipe';
import { CallItemComponent } from './call-item/call-item.component';
import { CameraButtonsComponent } from './camera-buttons/camera-buttons.component';
import { ChatItemComponent } from './chat-item/chat-item.component';
import { FlashButtonComponent } from './flash-button/flash-button.component';
import { IconComponent } from './icon/icon.component';
import { OptionListComponent } from './option-list/option.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { StatusItemComponent } from './status-item/status-item.component';
import { DividerListComponent } from './status-list/divider-list.component';
import { TextareaAutoComponent } from './textarea-auto/textarea-auto.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    ChatItemComponent,
    DividerListComponent,
    StatusItemComponent,
    CallItemComponent,
    SearchBarComponent,
    IconComponent,
    CameraButtonsComponent,
    TextareaAutoComponent,
    FlashButtonComponent,
    DateChatPreviewPipe,
    OptionListComponent,
    AudioPipe
  ],
  exports: [
    ChatItemComponent,
    DividerListComponent,
    StatusItemComponent,
    CallItemComponent,
    SearchBarComponent,
    IconComponent,
    CameraButtonsComponent,
    TextareaAutoComponent,
    FlashButtonComponent
  ],
  entryComponents: [
    OptionListComponent
  ]
})
export class ComponentsModule {}
