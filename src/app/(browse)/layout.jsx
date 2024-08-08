import UserDashboardLayout from "components/layouts/user-dashboard";
import { AuthGuard } from "components/auth-guard"; 

const Layout = ({ children }) => {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
};

export default Layout;