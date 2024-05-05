import navItems from "../../utils/navItems";

export default function findLocation(pathname) {
  const selectedItem = navItems.find((item) => `/${item.route}` === pathname);
  return selectedItem && selectedItem.title;
}
