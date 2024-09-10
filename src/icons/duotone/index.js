// Importing modules for various features in the application
import Apps from "./Apps";
import Chat from "./Chat";
import Shoe from "./Shoe";
import Vest from "./Vest";
import Order from "./Order";
import Pages from "./Pages";
import Shirt from "./Shirt";
import Refund from "./Refund";
import Review from "./Review";
import Seller from "./Seller";
import Logout from "./Logout";
import Invoice from "./Invoice";
import Session from "./Session";
import UserTie from "./UserTie";
import Pricing from "./Pricing";
import Settings from "./Settings";
import TodoList from "./TodoList";
import Products from "./Products";
import Accounts from "./Accounts";
import Calender from "./Calender";
import Customers from "./Customers";
import Dashboard from "./Dashboard";
import DataTable from "./DataTable";
import Ecommerce from "./Ecommerce";
import ElementHub from "./ElementHub";
import SiteSetting from "./SiteSetting";
import UserProfile from "./UserProfile";
import ProjectChart from "./ProjectChart";
import AccountSetting from "./AccountSetting";
import AdminEcommerce from "./AdminEcommerce";

/**
 * Object that consolidates all feature modules into a single exportable entity.
 * Each key corresponds to a specific feature, and the associated value is the respective module/component.
 *
 * This structure allows for easy access to multiple features within the application
 * by simply importing the `modules` object, making the codebase more modular and manageable.
 * 
 * @constant
 * @type {Object}
 */
const modules = {
  Apps,
  Chat,
  Shoe,
  Vest,
  Pages,
  Order,
  Shirt,
  Refund,
  Seller,
  Review,
  Logout,
  UserTie,
  Pricing,
  Invoice,
  Session,
  Settings,
  Accounts,
  Calender,
  Products,
  TodoList,
  DataTable,
  Customers,
  Dashboard,
  Ecommerce,
  ElementHub,
  UserProfile,
  SiteSetting,
  ProjectChart,
  AdminEcommerce,
  AccountSetting
};

export default modules;
