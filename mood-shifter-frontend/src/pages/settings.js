import React from "react";
import './css/settings.css'
import Footer from "../components/footer";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import PersonIcon from '@mui/icons-material/Person';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { green } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import '../components/getting-started/getting-started.css'
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';


const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: green[600],
      '&:hover': {
        backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: green[600],
    },
  }));
  
  const userName = localStorage.getItem('UID');
  console.log(userName);
function SettingsScreen({navigation}) {
  return (
    <div className="login">
        <Box sx={{ width: '100%', bgcolor: 'black' }}>
        <nav aria-label="main mailbox folders">
            <List>
            <ListItem >
            <Typography variant="h4" color="common.white">
            Settings
            </Typography>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon >
                    <PersonIcon sx={{ color: 'white' }}  />
                </ListItemIcon>
                <ListItemText sx={{ color: 'white' }} primary={`Logged in as:  ${userName}`}  />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon sx={{ color: 'white' }}>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText  sx={{ color: 'white' }}  primary="Recieve Email Updates" />
                <FormControlLabel control={<GreenSwitch   defaultChecked />}  />
                </ListItemButton>
            </ListItem>
            </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
            <List>
            {/* <ListItem disablePadding>
                <ListItemButton>
                <ListItemText primary="Trash" />
                </ListItemButton>
            </ListItem> */}
            <ListItem sx={{justifyContent:'center'}}>
                     <Button sx={{justifyContent:'center', color: 'red'  }} variant="text">Logout</Button>
{/*                 <ListItemButton sx={{align:'center', color: 'red'  }} component="a" href="#simple-list">
                <ListItemText   sx={{align:'center', color: 'red'  }}  primary="Logout" />
                </ListItemButton> */}
            </ListItem>
            </List>
        </nav>
        </Box>
        <Footer navigation={navigation}></Footer>
    </div>
    
  );

}
  export default SettingsScreen;

/* function SettingsScreen({navigation}) {
    let username = '';
    
    return (
        <div class="settings-div">
            <h1>Settings</h1>
            <h2>Logged in: {username}</h2>
            <div class="updated-div">
                <h2>Recieve email updates: </h2>
                <label class="switch" for="checkbox">
                    <input type="checkbox" id="checkbox" />
                    <div class="slider round"></div>
                </label>
            </div>
            <Footer navigation={navigation}></Footer>
        </div>
    )
}

export default SettingsScreen; */