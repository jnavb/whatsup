import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionListComponent implements OnInit {

  items: string[] = [];

  constructor(
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.items = this.navParams.get('opts');
  }

}
