import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-divider-list',
  templateUrl: './divider-list.component.html',
  styleUrls: ['./divider-list.component.scss']
})
export class DividerListComponent {

  @Input() text = '';

  constructor() { }

}
