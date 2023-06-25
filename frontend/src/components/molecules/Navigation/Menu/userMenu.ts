interface userHeaderProps {
    title?: string;
    link?: string;
    active?: boolean
}

export const userHeader:userHeaderProps[] = [
  {
    title: 'Home',
    link: '/',
    active: true,
  },
  {
    title: 'Create',
    link: '/create-post',
    active: false,
  },
  {
    title: 'Posts',
    link: '/posts',
    active: false,
  },

  {
    title: 'Authors',
    link: '/authors',
    active: false,
  },
];
