import { Logout, Person, Settings } from "@mui/icons-material";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
} from "@mui/material";

export type ProfileMenuProps = Omit<MenuProps, "onClose"> & {
  onClose: (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | "itemClick"
  ) => void;
};

export const ProfileMenu = ({ ...rest }: ProfileMenuProps) => {
  const handleItemClick = () => {
    rest.onClose({}, "itemClick");
  };

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
          minWidth: theme.spacing(44),
        }),
      }}
      {...rest}
    >
      <MenuItem onClick={handleItemClick}>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={handleItemClick}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        Settings
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleItemClick}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
