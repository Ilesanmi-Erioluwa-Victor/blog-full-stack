import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { userHeader, publicHeader } from './Nav';
import GeneralLayout from 'src/layouts/GeneralLayouts/GeneralLayout';

const userNav = [
  {
    name: 'Your Profile',
    link: `/profile`,
  },

  {
    name: 'Change your Password',
    link: `/update-password`,
  },
];



export const AccountMenu = ({ userProp }: any) => {
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
    <GeneralLayout>
      <AppBar
        position='static'
        style={{
          backgroundColor: '#ca8a04',
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            {userProp && userProp?.token ? (
              <>
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Link to={`/`}>Blog</Link>

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
                    {userHeader.map((page, idx) => (
                      <MenuItem
                        key={idx}
                        onClick={handleCloseNavMenu}
                      >
                        <Link to={`${page?.link}`}>{page?.title}</Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Link to={`/`}>Blog</Link>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: 'none', md: 'flex' },
                    columnGap: '3rem',
                    pl: '4rem',
                  }}
                >
                  {userHeader.map((page, idx) => (
                    <Link
                      key={idx}
                      onClick={handleCloseNavMenu}
                      className='my-2 text-white flex flex-col'
                      to={`${page?.link}`}
                      title={page?.title}
                    >
                      {page?.title}
                    </Link>
                  ))}
                </Box>

                <Stack
                  direction='row'
                  spacing={2}
                  className='pr-5'
                >
                  <Link
                    to={`/create-post`}
                    className='text-white'
                  >
                    New Post
                  </Link>
                </Stack>

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
                    {userNav.map((user, idx) => (
                      <MenuItem
                        key={idx}
                        onClick={handleCloseUserMenu}
                      >
                        <Link to={`${user?.link}`}>{user?.name}</Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                {/* <Link to={`/`}>Blog</Link> */}

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
                    {publicHeader.map((page, idx) => (
                      <MenuItem
                        key={idx}
                        onClick={handleCloseNavMenu}
                      >
                        <Link to={`${page?.link}`}>{page?.title}</Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Link to={`/`}>Blog</Link>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: 'none', md: 'flex' },
                    columnGap: '3rem',
                    pl: '4rem',
                  }}
                >
                  {publicHeader.map((page, idx) => (
                    <Link
                      key={idx}
                      onClick={handleCloseNavMenu}
                      className='my-2 text-white flex flex-col'
                      to={`${page?.link}`}
                      title={page?.title}
                    >
                      {page?.title}
                    </Link>
                  ))}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </GeneralLayout>
  );
};
