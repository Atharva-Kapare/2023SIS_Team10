import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';


/*   return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)],
  );
} */

function Footer() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <Box sx={{ pb: 7, }} ref={ref}>
      <CssBaseline />

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={5}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
        
          }}
          sx={{backgroundColor: '#232426'}}
        >
          <BottomNavigationAction  style={{color:'#ffffff'}} label="Home" icon={<HomeIcon style={{color:'#ffffff'}}/>  }  />
          <BottomNavigationAction  style={{color:'#ffffff'}} label="Playlist" icon={<SubscriptionsIcon style={{color:'#ffffff'}} />} />
          <BottomNavigationAction  style={{color:'#ffffff'}} label="Settings" icon={<SettingsIcon style={{color:'#ffffff'}} />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
export default Footer;