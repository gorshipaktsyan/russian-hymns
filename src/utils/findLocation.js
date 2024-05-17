import createNavItems from "./createNavItems";

export default function findLocation(pathname, lg) {
  const navItems = createNavItems(lg);
  const selectedItem = navItems.find((item) => `/${item.route}` === pathname);

  return selectedItem && selectedItem.title;
}
