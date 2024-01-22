export default function findLocation(pathname, currentNumber, navItems) {
  return pathname === "/russian-hymns"
    ? `Гимн ${currentNumber}`
    : pathnamesTitle(pathname);

  function pathnamesTitle(pathname) {
    const selectedItem = navItems.find(
      (item) => `/russian-hymns/${item.route}` === pathname
    );
    return selectedItem && selectedItem.title;
  }
}
