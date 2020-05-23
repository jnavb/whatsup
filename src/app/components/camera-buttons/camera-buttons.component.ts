import { Component } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-camera-buttons',
  templateUrl: './camera-buttons.component.html',
  styleUrls: ['./camera-buttons.component.scss']
})
export class CameraButtonsComponent {

  constructor(
    private camera: CameraService
  ) { }

  toggleFlash() {
    this.camera.toogleFlash();
  }

  onShot() {
    // TODO
  }

  onSwitchCamera() {
    this.camera.switch();
  }


}
