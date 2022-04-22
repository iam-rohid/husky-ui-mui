import { Fragment, useCallback, useEffect, useState, MouseEvent } from "react";
import {
  ChevronRight,
  CircleOutlined,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import {
  demo01Menu,
  MenuGroupItemType,
  MenuLinkItemType,
} from "src/data/dashboard-menu";
import { useRouter } from "next/router";

export type DashboardSidebarProps = {
  compact?: boolean;
  pageId?: string;
};

export const DashboardSidebar = ({
  compact,
  pageId,
}: DashboardSidebarProps) => {
  const [openLists, setOpenLists] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const routes = router.route.split("/").filter((r) => !!r);
    setOpenLists([...routes]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper
      component="aside"
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: 0,
        overflowY: "auto",
      }}
    >
      <Box
        sx={(theme) => ({
          bgcolor: alpha(theme.palette.background.paper, 0.75),
          backdropFilter: "blur(5px)",
          height: theme.spacing(14),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          position: "sticky",
          top: 0,
        })}
      >
        <Typography
          sx={(theme) => ({
            fontSize: theme.spacing(6),
            fontWeight: 800,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          })}
        >
          {compact ? "HUI" : "Husky UI"}
        </Typography>
      </Box>

      <List sx={{ width: "100%" }}>
        {demo01Menu.map((item, i) => (
          <Fragment key={i}>
            {item.__typename === "MenuGroupItem" ? (
              <GroupItem
                group={item}
                isOpen={openLists.includes(item.id)}
                onClick={() => {
                  if (!compact) {
                    setOpenLists(
                      openLists.includes(item.id)
                        ? [...openLists.filter((id) => id !== item.id)]
                        : [...openLists, item.id]
                    );
                  }
                }}
                isCompact={compact}
                pageId={pageId}
                openLists={openLists}
                setOpenLists={setOpenLists}
              />
            ) : item.__typename === "MenuLinkItem" ? (
              <ListLinkItem item={item} pageId={pageId} />
            ) : item.__typename === "MenuLabelItem" ? (
              <div></div>
            ) : null}
          </Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default DashboardSidebar;

export const GroupItem = ({
  group,
  isOpen,
  onClick,
  isCompact,
  pageId,
  openLists,
  setOpenLists,
  level = 0,
  onMenuClose,
}: {
  group: MenuGroupItemType;
  isOpen?: boolean;
  onClick?: () => void;
  isCompact?: boolean;
  pageId?: string;
  openLists: string[];
  setOpenLists: (openLists: string[]) => void;
  level?: number;
  onMenuClose?: () => void;
}) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onClick && onClick();
      if (isCompact) {
        setMenuAnchor(!!menuAnchor ? null : event.currentTarget);
      }
    },
    [menuAnchor, onClick, isCompact]
  );

  const handleMenuClose = useCallback(() => {
    if (isCompact) {
      setMenuAnchor(null);
      onMenuClose && onMenuClose();
    }
  }, [isCompact, onMenuClose]);

  const getSubMenuList = (isMenu?: boolean) =>
    group.subMenu.map((subItem, j) =>
      subItem.__typename === "MenuLinkItem" ? (
        <ListLinkItem
          key={j}
          item={subItem}
          pageId={pageId}
          level={isMenu ? 0 : level + 1}
        />
      ) : subItem.__typename === "MenuGroupItem" ? (
        <GroupItem
          key={j}
          group={subItem}
          pageId={pageId}
          isCompact={isCompact}
          isOpen={openLists.includes(subItem.id)}
          openLists={openLists}
          setOpenLists={setOpenLists}
          level={isMenu ? 0 : level + 1}
          onMenuClose={handleMenuClose}
          onClick={() => {
            if (!isCompact) {
              setOpenLists(
                openLists.includes(subItem.id)
                  ? [...openLists.filter((id) => id !== subItem.id)]
                  : [...openLists, subItem.id]
              );
            }
          }}
        />
      ) : null
    );

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          id={group.id}
          component={"button"}
          onClick={handleClick}
        >
          <ListItemIcon
            sx={(theme) => ({
              pl: level ? level * 6 : undefined,
            })}
          >
            {group.Icon ? <group.Icon /> : <CircleOutlined />}
          </ListItemIcon>
          <ListItemText primary={group.label} />

          {isCompact ? (
            <ChevronRight />
          ) : isOpen ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )}
        </ListItemButton>
      </ListItem>
      <Collapse in={isOpen && !isCompact} timeout="auto" unmountOnExit>
        <List disablePadding>{getSubMenuList(false)}</List>
      </Collapse>
      <Menu
        open={!!menuAnchor}
        onClose={handleMenuClose}
        anchorEl={menuAnchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          ml: 2,
        }}
      >
        {getSubMenuList(true)}
      </Menu>
    </>
  );
};

const ListLinkItem = ({
  item,
  pageId,
  level = 0,
  onClick,
}: {
  item: MenuLinkItemType;
  pageId?: string;
  level?: number;
  onClick?: () => void;
}) => {
  return (
    <ListItem disablePadding>
      <Link href={item.path} passHref>
        <ListItemButton
          component="a"
          selected={pageId === item.id}
          onClick={onClick}
        >
          <ListItemIcon
            sx={{
              pl: level ? level * 6 : undefined,
            }}
          >
            {!!item.Icon ? <item.Icon /> : <CircleOutlined />}
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};
