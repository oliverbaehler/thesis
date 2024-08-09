import UserDashboardLayout from "components/layouts/user-dashboard";
import { AuthGuard } from "components/auth-guard"; 
import IndexPageView from "pages-sections/landing/page-view";
import LandingLayout from "components/layouts/landing";

const Layout = ({ children }) => {
  return (
    <LandingLayout>
    <AuthGuard>
      {children}
    </AuthGuard>
    </LandingLayout>
  );
};

export default Layout;