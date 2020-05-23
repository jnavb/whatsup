import { Component, Input, OnInit } from '@angular/core';
import { Calls } from 'src/app/model/chat';

@Component({
  selector: 'app-call-item',
  templateUrl: './call-item.component.html',
  styleUrls: ['./call-item.component.scss']
})
export class CallItemComponent implements OnInit {

  @Input() call: Calls;

  constructor() { }

  ngOnInit() {}

}
