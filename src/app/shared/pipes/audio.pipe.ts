import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'audio'
})
export class AudioPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    // TODO
    const minutes = Math.floor(Math.random() * 10);
    const secondsDigit1 = Math.floor(Math.random() * 10);
    const secondsDigit2 = Math.floor(Math.random() * 10);

    return minutes + ':' + secondsDigit1 + secondsDigit2;
  }

}
