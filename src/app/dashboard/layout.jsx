import UserDashboardLayout from "components/layouts/user-dashboard";
import { AuthGuard } from "components/auth-guard"; 

const Layout = ({ children }) => {
  return (
    <AuthGuard>
      <UserDashboardLayout>{children}</UserDashboardLayout>
    </AuthGuard>
  );
};

export default Layout;