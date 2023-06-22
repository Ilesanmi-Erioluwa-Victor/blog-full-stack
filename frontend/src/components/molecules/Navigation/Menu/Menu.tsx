import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import GeneralLayout from 'src/layouts/GeneralLayouts/GeneralLayout';


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


const publicHeader = [
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

interface propsInterface {
  userProp: any;
}

export const AccountMenu = ({
  userProp
}: propsInterface): JSX.Element => {

   const dispatch = useAppDispatch();
   const userState = useAppSelector((state) => state?.users);

   const { user } = userState;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(user)

  return (
    <GeneralLayout>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Link to='/'>
          <div className={`w-1/12 h-full flex items-center cursor-pointer`}>
            <img
              src='/main_logo.svg'
              alt='logo'
              className=''
            />
          </div>
        </Link>
        {/* sx={{ minWidth: 100 }} */}

        {
          user && user?.token ? (
            userHeader.map(() => {
              return ()
            })
          ) : (
              <div>Hello</div>
          )
        }
        <Link
          to={'/'}
          style={{
            minWidth: '100',
          }}
        >
          Contact
        </Link>
        <Link
          to={'/'}
          style={{ minWidth: 100 }}
        >
          Profile
        </Link>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* {user.map((user: any, idx: number) => {
          return (
            <MenuItem onClick={handleClose} key={idx}>
              <Avatar /> {user?.name}
            </MenuItem>
          );
        })} */}
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize='small' />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </GeneralLayout>
  );
};
