import * as React from 'react';
import { useEffect, useState } from "react";

import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import axios from "axios";

const drawerWidth = 300;

function Sider(props) {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
  
    useEffect(() => {
      const loadPosts = async () => {
        setLoading(true);
        const response = await axios.get(
          "http://openlibrary.org/subjects/subject.json"
        );
        setPosts(response.data.works);
        setLoading(false);
      };
  
      loadPosts();
    }, []);



  
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      
      <p className="form-group mx-sm-3 mt-4"><strong>Trending Subjects</strong></p>
      <div className="form-group mx-sm-3 mb-2 ">
      <input className="form-control col-3 input-sm " type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>
      
      
      <Divider />
      <List>
      {loading ? (
          <h4>Loading ...</h4>
          ) : (
              posts
              .filter((value) => {
                  if (searchTitle === "") {
                      return value;
                    } else if (
              value.title.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
            
        })
          .slice(0,4).map((item) => <div className="form-group mb-3 mx-sm-3" key={item.title}><li>{item.title}</li></div>)
          )}
      </List>
      
    </div>
  );


  return (
    <Box sx={{ display: 'flex' }}>
        <Toolbar>
          <IconButton
            onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        
        </Toolbar>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      
        
    </Box>
  );
}


export default Sider;
