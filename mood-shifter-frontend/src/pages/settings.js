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
    <div className="settings-div">
      <Box>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem >
              <Typography variant="h4" color="common.white">Settings</Typography>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon >
                      <PersonIcon sx={{ color: 'white' }}  />
                  </ListItemIcon>
                  <ListItemText sx={{ color: 'white' }} primary={`Logged In:  ${userName}`}  />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: 'white' }}>
                      <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText  sx={{ color: 'white' }}  primary="Email Updates" />
                  <FormControlLabel control={<GreenSwitch   defaultChecked />}  />
                </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider/>
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem sx={{justifyContent:'center'}}>
              <Button sx={{justifyContent:'center', color: 'red'}} variant="text">Logout</Button>
            </ListItem>
          </List>
        </nav>
      </Box>
      <Footer navigation={navigation}></Footer>
    </div>
  );
}
  export default SettingsScreen;