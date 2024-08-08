import duotone from "icons/duotone";
export const navigation = [{
  type: "label",
  label: "Creator"
}, {
  name: "Products",
  icon: duotone.Products,
  children: [{
    name: "Manage",
    path: "/dashboard/products"
  }, {
    name: "Create",
    path: "/dashboard/products/create"
  }]
}, {
  name: "Collections",
  icon: duotone.Apps,
  children: [{
    name: "Manage",
    path: "/dashboard/collections"
  }, {
    name: "Create",
    path: "/dashboard/collections/create"
  }]
}, {
  type: "label",
  label: "User"
}, {
  name: "Account Settings",
  icon: duotone.AccountSetting,
  path: "/dashboard/account-settings"
}, {
  name: "Logout",
  icon: duotone.Session,
  path: "/logout"
}];