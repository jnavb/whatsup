import { Injectable } from '@angular/core';

export enum Options {
  PREVIEW,
  DM,
  GROUP
}

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor() { }

  retrieveData(type: Options) {
    switch (type) {
      case Options.PREVIEW:
        return [
          'New group',
          'New broadcast',
          'Whatsapp Web',
          'Starred messages',
          'Settings'
        ];
      case Options.DM:
        return [
          'View contact',
          'Media, links, and docs',
          'Search',
          'Mute notifications',
          'Wallpaper'
        ];
      case Options.GROUP:
        return [
          'Group info',
          'Group media',
          'Search',
          'Mute notifications',
          'Wallpaper'
        ];
    }
  }

}
