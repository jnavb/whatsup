import { ChatPreview } from '../model/chat';

export const chatsPreviewMock: ChatPreview[] = [
  {
    id: 1,
    type: 'DM',
    img: '/assets/images/profiles/male1.jpeg',
    title: 'William',
    newMessages: 3,
    lastMessage: {
      type: 'TEXT',
      text: 'How are you?',
      checked: false,
      date: 1
    }
  },
  {
    id: 1,
    type: 'DM',
    img: '/assets/images/profiles/female1.jpeg',
    title: 'Adrianne',
    newMessages: 0,
    lastMessage: {
      type: 'IMAGE',
      img: '',
      date: 1
    }
  },
  {
    id: 1,
    type: 'GROUP',
    img: '/assets/images/profiles/group1.jpeg',
    title: 'Soccer Team',
    newMessages: 0,
    lastMessage: {
      type: 'TEXT',
      from: 'Yeroy',
      text: 'Who is free at 12?',
      checked: true,
      date: 1
    }
  },
  {
    id: 1,
    type: 'DM',
    img: '/assets/images/profiles/male2.jpeg',
    title: 'John',
    newMessages: 0,
    lastMessage: {
      type: 'TEXT',
      text: 'Omg',
      checked: true,
      date: 1
    }
  },
  {
    id: 1,
    type: 'DM',
    img: '/assets/images/profiles/female2.jpeg',
    title: 'Alex',
    newMessages: 0,
    lastMessage: {
      type: 'TEXT',
      text: 'Seems good',
      checked: true,
      date: 1
    }
  },
  {
    id: 1,
    type: 'DM',
    img: '/assets/images/profiles/male3.jpeg',
    title: 'Kevin',
    newMessages: 0,
    lastMessage: {
      type: 'TEXT',
      text: 'Hey dude',
      checked: true,
      date: 1
    }
  },
  {
    id: 1,
    type: 'DM',
    img: '/assets/images/profiles/female3.jpeg',
    title: 'Martha',
    newMessages: 0,
    lastMessage: {
      type: 'TEXT',
      text: 'Ok',
      checked: true,
      date: 1
    }
  },
  {
    id: 1,
    type: 'GROUP',
    img: '/assets/images/profiles/group2.jpeg',
    title: 'Weekend travel',
    newMessages: 0,
    lastMessage: {
      type: 'AUDIO',
      from: 'Sarah',
      duration: 12312,
      date: 1
    }
  },
  {
    id: 1,
    type: 'GROUP',
    img: '/assets/images/profiles/group3.jpeg',
    title: 'Family',
    newMessages: 0,
    lastMessage: {
      type: 'IMAGE',
      from: 'Greg',
      img: '',
      date: 1
    }
  },
  {
    id: 1,
    type: 'DM',
    img: '/assets/images/profiles/male4.jpeg',
    title: 'Andrew',
    newMessages: 0,
    lastMessage: {
      type: 'TEXT',
      text: 'Sure',
      checked: true,
      date: 1
    }
  },
  {
    id: 1,
    type: 'DM',
    img: '/assets/images/profiles/male5.jpeg',
    title: 'Mathew',
    newMessages: 0,
    lastMessage: {
      type: 'TEXT',
      text: 'Nope',
      checked: true,
      date: 1
    }
  }
];
