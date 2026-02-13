// export const pageTitles: Record<string, string> = {
//   "/admin/dashboard": "Dashboard",
//   "/admin/admin-list": "Admin List",
//   "/admin/create-admin": "Create Admin",
//   "/admin/edit-admin": "Edit Admin",
//   "/admin/customer-list": "Customer List",
//   "/admin/create-customer": "Create Customer",
//   "/admin/edit-customer": "Edit Customer",
// };

export const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/admin-list": "Admin List",
  "/admin/create-admin": "Create Admin",
  "/admin/edit-admin/:id": "Edit Admin",
  "/admin/customer-list": "Customer List",
  "/admin/create-customer": "Create Customer",
  "/admin/edit-customer/:id": "Edit Customer",
};

export const getPageTitle = (pathname: string): string => {
  for (const path in pageTitles) {
    // Handle dynamic routes
    if (path.includes(":id")) {
      const basePath = path.replace(":id", "");
      if (pathname.startsWith(basePath)) {
        return pageTitles[path];
      }
    } 
    if (pathname === path) {
      return pageTitles[path];
    }
  }

  return "Admin Panel";
};

