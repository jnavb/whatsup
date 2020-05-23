import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { callsMock } from '../mock/calls';
import { lorem, membersMock } from '../mock/messages';
import { chatsPreviewMock } from '../mock/previews';
import { statusMock } from '../mock/status';
import { Calls, Chat, ChatPreview, Status } from '../model/chat';
import { hashCode } from '../shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chats: BehaviorSubject<{[key: number]: Chat} | {}> = new BehaviorSubject({});

  constructor() {
    this.preloadChats();
  }

  getPreviews$() {
    return of<ChatPreview[]>(chatsPreviewMock).pipe(
      map(preview => this.mockDate(preview)),
      map(preview => this.mockId(preview))
    );
  }

  getCalls$() {
    return of<Calls[]>(callsMock);
  }

  getStatus$() {
    return of<Status>(statusMock);
  }

  getChats$() {
    return this.chats.asObservable();
  }

  private preloadChats() {
    this.getPreviews$().pipe(
      map(previews => previews.map(preview => ({ [preview.id]: this.generateChat(preview) }) )),
      map(chatsArr => Object.assign({}, ...chatsArr))
    )
    .subscribe(chats => this.chats.next(chats));
  }

  private mockId(arr: any[]) {
    return arr.map((el, i) => ({ ...el, id: i }));
  }

  private mockDate(previews: ChatPreview[]) {
    let messageDate = moment();
    previews.forEach(preview => {
      preview.lastMessage.date = messageDate.valueOf();
      messageDate = messageDate.subtract(1, 'd');
    });
    return previews;
  }

  private generateChat({ type, title }: ChatPreview): Chat {
    const hash = (hashCode(title) + '').repeat(7);
    const messages = hash.split('').map((val, i) => (
      {
        type: 'TEXT',
        from: +val < 5 ? title : null,
        checked: true,
        text: lorem[val],
        date: moment().subtract(i, i < 10 ? 'minutes' : 'hours').valueOf()
      }
    ))
    .reverse();
    const meta = { title, ...this.generateMembers(hash, type)  };

    return { messages, meta } as Chat;
  }

  private generateMembers(hash, type) {
    if (type === 'DM') return { members: null };

    const members = hash
    .slice(0, 5)
    .split('')
    .map(val => membersMock[val]);

    return { members };
  }

}
