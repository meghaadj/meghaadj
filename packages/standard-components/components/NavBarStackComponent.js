import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import NavBarButtonComponent from "./NavBarButtonComponent";

const NavBarStackComponent = (props) => {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const arr = props.arr || [];
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <NavBarButtonComponent
        title={props.title}
        onClick={(e) => {
          setAnchorEl(e.target);
        }}
      />
      <Menu
        id="profile-menu"
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        {arr.map((e, i) => (
          <MenuItem
            onClick={() => {
              handleClose();
              e.onClick();
            }}
            key={e.title + i}
          >
            {e.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default NavBarStackComponent;
