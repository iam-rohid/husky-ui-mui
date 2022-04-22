import {
  Apps,
  Article,
  CalendarMonth,
  Dashboard,
  Email,
  Message,
  SvgIconComponent,
} from "@mui/icons-material";

export type MenuLinkItemType = {
  __typename: "MenuLinkItem";
  id: string;
  path: string;
  Icon?: SvgIconComponent;
  label: string;
};

export type MenuGroupItemType = {
  __typename: "MenuGroupItem";
  id: string;
  label: string;
  Icon?: SvgIconComponent;
  subMenu: MenuType;
};

export type MenuLabelItemType = {
  __typename: "MenuLabelItem";
  label: string;
};

export type MenuType = (
  | MenuLinkItemType
  | MenuGroupItemType
  | MenuLabelItemType
)[];

const demo01Prefix = "/demo-01";

export const demo01Menu: MenuType = [
  {
    __typename: "MenuGroupItem",
    id: "dashboard",
    Icon: Dashboard,
    label: "Dashboard",
    subMenu: [
      {
        __typename: "MenuLinkItem",
        id: "crm",
        label: "CRM",
        path: `${demo01Prefix}/dashboard/crm`,
      },
      {
        __typename: "MenuLinkItem",
        id: "analytics",
        label: "Analytics",
        path: `${demo01Prefix}/dashboard/analytics`,
      },
      {
        __typename: "MenuLinkItem",
        id: "e-commerce",
        label: "E-Commerce",
        path: `#`,
      },
    ],
  },
  {
    __typename: "MenuGroupItem",
    id: "apps",
    Icon: Apps,
    label: "Apps",
    subMenu: [
      {
        __typename: "MenuLinkItem",
        id: "chat",
        label: "Chat",
        path: `#`,
        Icon: Message,
      },
      {
        __typename: "MenuLinkItem",
        id: "email",
        label: "Email",
        path: `#`,
        Icon: Email,
      },
      {
        __typename: "MenuLinkItem",
        id: "caleandar",
        label: "Calendar",
        path: `#`,
        Icon: CalendarMonth,
      },
    ],
  },
  {
    __typename: "MenuGroupItem",
    id: "pages",
    Icon: Article,
    label: "Pages",
    subMenu: [
      {
        __typename: "MenuGroupItem",
        id: "pages/auth",
        label: "Auth",
        subMenu: [
          {
            __typename: "MenuLinkItem",
            id: "login",
            label: "Log In",
            path: `#`,
            Icon: Article,
          },
          {
            __typename: "MenuLinkItem",
            id: "signup",
            label: "Sign Up",
            path: `#`,
            Icon: Article,
          },
        ],
      },
      {
        __typename: "MenuLinkItem",
        id: "profile",
        label: "Profile",
        path: `#`,
        Icon: Article,
      },
    ],
  },
];
