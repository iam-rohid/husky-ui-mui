import { Computer, DarkMode, LightMode } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem, MenuProps } from "@mui/material";
import React from "react";
import { useColorScheme } from "src/context/color-scheme";

export type ColorSchemeMenuProps = Omit<MenuProps, "onClose"> & {
  onClose: (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | "itemClick"
  ) => void;
};

export const ColorSchemeMenu = ({ ...rest }: ColorSchemeMenuProps) => {
  const handleItemClick = () => {
    rest.onClose({}, "itemClick");
  };
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <Menu
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      MenuListProps={{
        sx: (theme) => ({
          minWidth: theme.spacing(36),
        }),
      }}
      {...rest}
    >
      <MenuItem
        onClick={() => {
          setColorScheme("light");
          handleItemClick();
        }}
      >
        <ListItemIcon>
          <LightMode />
        </ListItemIcon>
        Light
      </MenuItem>
      <MenuItem
        onClick={() => {
          setColorScheme("dark");
          handleItemClick();
        }}
      >
        <ListItemIcon>
          <DarkMode />
        </ListItemIcon>
        Dark
      </MenuItem>
      <MenuItem
        onClick={() => {
          setColorScheme("system");
          handleItemClick();
        }}
      >
        <ListItemIcon>
          <Computer />
        </ListItemIcon>
        System
      </MenuItem>
    </Menu>
  );
};

export default ColorSchemeMenu;
