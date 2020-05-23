import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, pluck } from 'rxjs/operators';
import { AndroidBackService } from 'src/app/services/back-button.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() text = new EventEmitter<string>();

  @ViewChild('input', { static: true }) input: ElementRef;

  isOpen = false;

  constructor(
    public el: ElementRef,
    private keyboard: Keyboard,
    private headerService: HeaderService,
    private androidBack: AndroidBackService,
  ) {}

  ngOnInit() {
    this.emitOnInputChanges();
    this.listenOnAndroidBack();
    this.listenOnOutsideToggle();
  }

  onToggle() {
    this.resetInput();

    this.isOpen = !this.isOpen;
    this.isOpen ? this.input.nativeElement.focus() : this.keyboard.hide();

    this.headerService.notifySearchbar(this.isOpen);
  }

  onCancel() {
    this.resetInput();
    this.input.nativeElement.focus();
  }

  private resetInput() {
    this.input.nativeElement.value = '';
    this.text.emit('');
  }

  private emitOnInputChanges() {
    fromEvent(this.input.nativeElement, 'input')
    .pipe(
      debounceTime(100),
      pluck('target', 'value'),
      distinctUntilChanged()
    ).subscribe((text: string) => this.text.emit(text));
  }

  private listenOnAndroidBack() {
    this.androidBack.onBack(() => {
      if (this.isOpen && !this.keyboard.isVisible) this.onToggle();
    });
  }

  private listenOnOutsideToggle() {
    this.headerService.onSearchToggle$().subscribe(isOpen => this.isOpen = isOpen);
  }



}
