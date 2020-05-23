import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-item',
  templateUrl: './status-item.component.html',
  styleUrls: ['./status-item.component.scss']
})
export class StatusItemComponent implements OnInit {

  @Input() data: {
    img: string,
    title: string,
    subtitle: string,
    showAddIcon: boolean
  };

  constructor() { }

  ngOnInit() {}

}
