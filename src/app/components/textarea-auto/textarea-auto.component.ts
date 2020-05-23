import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter, Renderer2 } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { listen } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-textarea-auto',
  templateUrl: './textarea-auto.component.html',
  styleUrls: ['./textarea-auto.component.scss']
})
export class TextareaAutoComponent implements OnInit {

  @Input() maxLines = 6;
  @Input() placeholder = '';
  @Input() set onClear(onClear) {
    onClear.subscribe(() => this.resetHeight());
  }

  @Input()
  get value() {
    return this.textEl.value;
  }
  set value(val) {
    this.textEl.value = val;
    this.valueChange.emit(this.value);
  }

  @Output() linesChange = new EventEmitter();
  @Output() valueChange = new EventEmitter();


  @ViewChild('textView', { static: true }) set textView(textView) {
    this.textEl = textView.nativeElement;
  }

  public textEl;
  private lines = 1;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    fromEvent(this.textEl, 'input')
    .subscribe(input => this.onType(input));

    this.value = this.value || '';

    const delayedResize = () => {
        window.setTimeout(this.resize, 0);
    };
    listen(this.textEl, 'change',  this.resize);
    listen(this.textEl, 'cut',     delayedResize);
    listen(this.textEl, 'paste',   delayedResize);
    listen(this.textEl, 'drop',    delayedResize);
    listen(this.textEl, 'keydown', delayedResize);

    this.textEl.focus();
    this.textEl.select();
  }

  resize = () => {
    const scrollHeightBefore = this.textEl.scrollHeight;
    const actualLines = Math.round(scrollHeightBefore / 22);
    if (actualLines > this.maxLines) return;

    this.renderer.setStyle(this.textEl, 'height', 'auto');
    const scrollHeightAfter = this.textEl.scrollHeight;
    this.renderer.setStyle(this.textEl, 'height', this.textEl.scrollHeight  + 'px');

    const newLines = Math.round(scrollHeightAfter / 22);
    if (newLines !== this.lines) this.linesChange.emit(newLines);
    this.lines = newLines;
  }

  private resetHeight() {
    this.lines = 1;
    this.renderer.setStyle(this.textEl, 'height', 'auto');
  }

  private onType(input) {
    this.value = input.target.value;
  }

}
