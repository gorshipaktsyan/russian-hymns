export default function findLocation(pathname, navItems) {
  const selectedItem = navItems.find((item) => `/${item.route}` === pathname);
  return selectedItem && selectedItem.title;
}
