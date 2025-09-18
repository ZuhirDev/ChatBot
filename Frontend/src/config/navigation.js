import DASHBOARD_ROUTES from "@dashboard/routes/paths";
import { LayoutDashboardIcon } from "lucide-react";

const getNavItems = (t) => [
    {
      key: 'home',
      title: t('navbar:home'),
      url: DASHBOARD_ROUTES.DASHBOARD,
      icon: LayoutDashboardIcon,
    },
];

export default getNavItems;