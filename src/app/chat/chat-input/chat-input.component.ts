import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputComponent implements OnInit {

  clearTextArea = new Subject();
  inputFormatted = '';

  get text() {
    return this.textValue;
  }
  set text(val) {
    this.textValue = val;
    this.inputFormatted = val.trim();
  }

  @Output() send = new EventEmitter();
  @Output() audio = new EventEmitter();

  private textValue = '';
  private readonly INITIAL_HOST_HEIGHT = 60;

  @HostBinding('style.height') hostHeight = this.INITIAL_HOST_HEIGHT + 'px';

  constructor() { }

  ngOnInit() {}

  onLinesChange(lines) {
    this.hostHeight = this.INITIAL_HOST_HEIGHT + ((lines - 1) * 16) + 'px';
  }

  onSend() {
    // textarea.textEl.focus();
    this.send.emit(this.inputFormatted);
    this.text = '';
    this.shrinkInput();
  }

  shrinkInput() {
    this.onLinesChange(1);
    this.clearTextArea.next(true);
  }
}
