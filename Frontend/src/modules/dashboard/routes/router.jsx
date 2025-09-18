import ProtectedRoutes from "@/routes/ProtectedRoutes";
import DASHBOARD_ROUTES from "@dashboard/routes/paths";
import DashboardPage from "@dashboard/pages/DashboardPage";

const router = [

    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: DASHBOARD_ROUTES.DASHBOARD,
                element: <DashboardPage />,
            },
        ]
    }

];

export default router;