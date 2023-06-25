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
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
// import GeneralLayout from 'src/layouts/GeneralLayouts/GeneralLayout';



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
              <Link to={`/`}>HMMM</Link>

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
              <Link to={`/`}>GOOOOOO</Link>
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
              <Link to={`/`}>HMMM</Link>

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
              <Link to={`/`}>GOOOOOO</Link>
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
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
