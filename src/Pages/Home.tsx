import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from '@mui/icons-material/Home';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import React, { useState } from "react";

function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Drawer open={true}>
        <Toolbar
          onMouseEnter={() => {
            setOpen(true);
          }}
          onMouseLeave={() => {
            setOpen(false);
          }}
          sx={{
            backgroundColor: "white",
            width: `${open ? "240px" : "60px"}`,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            transition: "all .2s ease-in-out",
            fontSize: "10px",
          }}
        >
          <List>
            <ListItem sx={{ padding: "10px 20px",borderBottom: ".5px solid #ccc" }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                {open ? <CloseIcon /> : <MenuIcon />}
              </ListItemIcon>
              <ListItemText>{open ? "Student Portal" : ""}</ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "10px 20px",marginTop: "20px" }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>{open ? "Home" : ""}</ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "10px 20px" }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <DataUsageIcon/>
              </ListItemIcon>
              <ListItemText>{open ? "Student Enrollment" : ""}</ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "10px 20px" }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <MilitaryTechIcon/>
              </ListItemIcon>
              <ListItemText>{open ? "Result" : ""}</ListItemText>
            </ListItem>
          </List>
        </Toolbar>
      </Drawer>
    </div>
  );
}

export default Home;
