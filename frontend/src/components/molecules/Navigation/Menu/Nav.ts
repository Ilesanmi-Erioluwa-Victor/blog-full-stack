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


interface publicHeaderProps {
  title?: string;
  link?: string;
  active?: boolean;
}

export const publicHeader : publicHeaderProps[] = [
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
    title: 'Register',
    link: '/signup',
    active: false,
  },
  {
    title: 'Login',
    link: '/login',
    active: false,
  },
];
