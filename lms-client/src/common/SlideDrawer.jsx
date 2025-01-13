/* eslint-disable react/prop-types */
import Drawer from '@mui/material/Drawer';

const SlideDrawer = ({ anchor = 'right', open, toggleDrawer, children }) => {

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer(false)}
    >
      {children}
    </Drawer>
  );
};

export default SlideDrawer;
