import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
// import GeneralLayout from 'src/layouts/GeneralLayouts/GeneralLayout';

const userHeader = [
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

// const userNav = [
//   {
//     name: 'Your Profile',
//     link: `/profile`,
//   },

//   {
//     name: 'Change your Password',
//     link: `/update-password`,
//   },
// ];

// const publicHeader = [
//   {
//     title: 'Home',
//     link: '/',
//     active: true,
//   },
//   {
//     title: 'Create',
//     link: '/create-post',
//     active: false,
//   },
//   {
//     title: 'Posts',
//     link: '/posts',
//     active: false,
//   },
//   {
//     title: 'Register',
//     link: '/signup',
//     active: false,
//   },
//   {
//     title: 'Login',
//     link: '/login',
//     active: false,
//   },
// ];

// interface propsInterface {
//   userProp: any;
// }

// export const AccountMenu = ({ userProp }: propsInterface): JSX.Element => {
//   const dispatch = useAppDispatch();
//   const userState = useAppSelector((state) => state?.users);

//   const { user } = userState;

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   console.log(user);

//   return (
//     <GeneralLayout>
//       <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
//         {/* sx={{ minWidth: 100 }} */}
//         <div className={`w-full h-20 sticky top-0 z-50  bg-green-900`}>
//           <div className={`relative h-20`}>
//             <header className='w-11/12 relative z-50 md:w-11/12 xl:w-10/12 mx-auto h-full flex justify-between  items-center'>
//               <Link to='/'>
//                 <div
//                   className={`w-1/12 h-full flex items-center cursor-pointer`}
//                 >
//                   <img
//                     src='/main_logo.svg'
//                     alt='logo'
//                     className=''
//                   />
//                 </div>
//               </Link>

//               {user && user?.token ? (
//                 <>
//                   {userHeader.map((name: any, idx: number) => {
//                     return (
//                       <MenuItem key={idx}>
//                         <Link
//                           to={`${name?.link}`}
//                           style={{
//                             minWidth: '100',
//                           }}
//                           key={idx}
//                         >
//                           {name.title}
//                         </Link>
//                       </MenuItem>
//                     );
//                   })}

//                   <Stack
//                     direction='row'
//                     spacing={2}
//                   >
//                     <Button variant='contained'>New Post</Button>
//                   </Stack>

//                   <Tooltip title='Account settings'>
//                     <IconButton
//                       onClick={handleClick}
//                       size='small'
//                       sx={{ ml: 2 }}
//                       aria-controls={open ? 'account-menu' : undefined}
//                       aria-haspopup='true'
//                       aria-expanded={open ? 'true' : undefined}
//                     >
//                       <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
//                     </IconButton>
//                   </Tooltip>
//                   <Menu
//                     anchorEl={anchorEl}
//                     id='account-menu'
//                     open={open}
//                     onClose={handleClose}
//                     onClick={handleClose}
//                     PaperProps={{
//                       elevation: 0,
//                       sx: {
//                         overflow: 'visible',
//                         filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                         mt: 1.5,
//                         '& .MuiAvatar-root': {
//                           width: 32,
//                           height: 32,
//                           ml: -0.5,
//                           mr: 1,
//                         },
//                         '&:before': {
//                           content: '""',
//                           display: 'block',
//                           position: 'absolute',
//                           top: 0,
//                           right: 14,
//                           width: 10,
//                           height: 10,
//                           bgcolor: 'background.paper',
//                           transform: 'translateY(-50%) rotate(45deg)',
//                           zIndex: 0,
//                         },
//                       },
//                     }}
//                     transformOrigin={{
//                       horizontal: 'right',
//                       vertical: 'top',
//                     }}
//                     anchorOrigin={{
//                       horizontal: 'right',
//                       vertical: 'bottom',
//                     }}
//                   >
//                     {/* {user.map((user: any, idx: number) => {
//           return (
//             <MenuItem onClick={handleClose} key={idx}>
//               <Avatar /> {user?.name}
//             </MenuItem>
//           );
//         })} */}
//                     {userNav.map((user: any, idx: number) => (
//                       <article key={idx}>
//                         <MenuItem
//                           onClick={handleClose}
//                           key={idx}
//                         >
//                           {/* <Avatar /> */}
//                           {user?.name}
//                         </MenuItem>
//                       </article>
//                     ))}
//                     <Divider />
//                     <MenuItem onClick={handleClose}>
//                       <ListItemIcon>
//                         <PersonAdd fontSize='small' />
//                       </ListItemIcon>
//                       Add another account
//                     </MenuItem>
//                     <MenuItem onClick={handleClose}>
//                       <ListItemIcon>
//                         <Settings fontSize='small' />
//                       </ListItemIcon>
//                       Settings
//                     </MenuItem>
//                     <MenuItem onClick={handleClose}>
//                       <ListItemIcon>
//                         <Logout fontSize='small' />
//                       </ListItemIcon>
//                       Logout
//                     </MenuItem>
//                   </Menu>
//                 </>
//               ) : (
//                 <div>Hello</div>
//               )}
//             </header>
//           </div>
//         </div>
//       </Box>
//     </GeneralLayout>
//   );
// };


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const  AccountMenu = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HMMM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {userNav.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GOOOOOO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt='Remy Sharp'
                  src='/static/images/avatar/2.jpg'
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

