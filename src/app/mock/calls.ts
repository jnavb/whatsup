import { Calls } from '../model/chat';

export const callsMock: Calls[] = [
  {
    receiverType: 'OUT',
    mediaType: 'CALL',
    img: '/assets/images/profiles/male1.jpeg',
    title: 'William',
    date: 1581980366850
  },
  {
    receiverType: 'OUT',
    mediaType: 'CALL',
    img: '/assets/images/profiles/female1.jpeg',
    title: 'Adrianne',
    date: 1581980366850
  },
  {
    receiverType: 'IN',
    mediaType: 'CALL',
    img: '/assets/images/profiles/female1.jpeg',
    title: 'Adrianne',
    date: 1581980366850
  },
  {
    receiverType: 'OUT',
    mediaType: 'CALL',
    img: '/assets/images/profiles/male4.jpeg',
    title: 'Andre',
    date: 1581980366850,
    accumulator: 3
  },
  {
    receiverType: 'OUT',
    mediaType: 'CALL',
    img: '/assets/images/profiles/female1.jpeg',
    title: 'Adrianne',
    date: 1581980366850
  },
  {
    receiverType: 'OUT',
    mediaType: 'CALL',
    img: '/assets/images/profiles/female2.jpeg',
    title: 'Martha',
    date: 1581980366850
  },
];
