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
import HomeIcon from "@mui/icons-material/Home";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import React, { useState } from "react";

function NavDrawer() {
  const [open, setOpen] = useState(false);
  return (
      <Drawer open={true} hideBackdrop={true} variant="permanent" sx={{opacity: 0.99,zIndex: 1000}}>
        <Toolbar
          onMouseEnter={() => {
            setOpen(true);
          }}
          onMouseLeave={() => {
            setOpen(false);
          }}
          sx={{
            width: `${open ? "190px" : "40px"}`,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            transition: "all .2s ease-in-out",
            fontSize: "10px",
            opacity: 0.9,

          }}
        >
          <List>
            <ListItem
              sx={{ padding: "10px 20px", borderBottom: ".5px solid #ccc" }}
            >
              <ListItemIcon sx={{ minWidth: 30 }}>
                {open ? <CloseIcon /> : <MenuIcon />}
              </ListItemIcon>
              <ListItemText>{open ? "Student Portal" : ""}</ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "10px 20px", marginTop: "20px" }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>{open ? "Home" : ""}</ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "10px 20px" }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <DataUsageIcon />
              </ListItemIcon>
              <ListItemText>{open ? "Student Enrollment" : ""}</ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "10px 20px" }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <MilitaryTechIcon />
              </ListItemIcon>
              <ListItemText>{open ? "Result" : ""}</ListItemText>
            </ListItem>
          </List>
        </Toolbar>
      </Drawer>
  );
}

export default NavDrawer;
