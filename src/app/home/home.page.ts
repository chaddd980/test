import { Component } from '@angular/core';
import { CameraPhoto, CameraResultType, CameraSource, Capacitor, FilesystemDirectory, FilesystemEncoding, Plugins } from '@capacitor/core';

const { Filesystem } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  public async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 75,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      height: 250,
    });

    console.log(image);
    this.fileWrite(image.base64String);
  }

  public async fileWrite(f: any) {
    try {
      const result = await Filesystem.writeFile({
        path: 'test/test.png',
        data: f,
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8,
      });
      console.log('Wrote file', result);
      // this.fileRead(f);
    } catch (e) {
      console.error('Unable to write file', e);
    }
  }

}
