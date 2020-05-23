import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-arrow',
  templateUrl: './chat-arrow.component.html',
  styleUrls: ['./chat-arrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatArrowComponent implements OnInit {

  @Input() ionContent: IonContent;
  show = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.ionContent.ionScroll.pipe(
      map(() => !this.hasReachBottom((this.ionContent as any).el.shadowRoot.children[1])),
      distinctUntilChanged()
    )
    .subscribe(show => {
      this.show = show;
      this.cdr.detectChanges();
    });
  }

  private hasReachBottom(el: HTMLElement) {
    const THRESHOLD = 20;
    return el.scrollTop + el.clientHeight >= el.scrollHeight - THRESHOLD;
  }

}
