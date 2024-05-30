import React from 'react';
import styled from '@emotion/styled';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { Stack } from '@mui/material';
const AppBarMenu = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip    {...props} classes={{ popper: className }} arrow placement="bottom-start" />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white', // Replace with your desired background color
    fontSize: '12px',
    borderRadius: '5px',
    border: "1px solid #e2e3e4",
    padding: "7px 0px",

  },
}));

export default AppBarMenu;
