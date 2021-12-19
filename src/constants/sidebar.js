import {
  IoChatbubblesOutline,
  IoHomeOutline,
  IoList,
  IoPeopleOutline,
  IoPricetagsOutline,
} from 'react-icons/io5';
export const mainLinks = [
  {
    icon: <IoHomeOutline size={30} />,
    title: '',
  },
  {
    icon: <IoPeopleOutline size={33} />, //
    title: 'users',
  },
  {
    icon: <IoPricetagsOutline size={30} />,
    title: 'products',
  },
  {
    icon: <IoList size={30} />,
    title: 'orders',
  },
  {
    icon: <IoChatbubblesOutline size={30} />,
    title: 'messages',
  },
  // {
  //   icon: <IoLogOutOutline size={33} />,
  //   title: 'Sign Out',
  // },
];

export const usersHeader = ['username', 'email', 'action'];
export const productHeader = ['no', 'name', 'category', 'status', 'action'];

