import { Injectable } from '@angular/core';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  isActive = false;
  isFlashActive = false;

  constructor(
    private camera: CameraPreview
  ) {}

  async requestPermission() {
    await this.activate().catch(console.error);
    this.deactivate();
  }

  activate() {
    if (this.isActive) return;
    this.isActive = true;
    console.log('Camera: activating...');

    return this.camera.startCamera({
      camera: this.camera.CAMERA_DIRECTION.BACK,
      toBack: true
    });
  }

  deactivate() {
    if (!this.isActive) return;

    this.camera.stopCamera();
    this.isActive = false;
    console.log('Camera: deactivating...');
  }

  switch() {
    this.camera.switchCamera().catch(console.error);
  }

  toogleFlash() {
    this.isFlashActive ?
      this.camera.setFlashMode(this.camera.FLASH_MODE.OFF).catch(console.error) :
      this.camera.setFlashMode(this.camera.FLASH_MODE.TORCH).catch(console.error);

    this.isFlashActive = !this.isFlashActive;
  }

}
