import { Component, Input, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() name: string;
  @Input() src: string;
  @Input() set disableRipple(val) {
    this.ripple = val === 'true';
  }
  @HostBinding('class.ion-activatable') ripple = true;

  get _src() {
    return this.src ? 'assets/icons/' + this.src + '.svg' : '';
  }

  constructor() { }

  ngOnInit() {}

}
