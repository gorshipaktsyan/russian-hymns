export default function findLocation(pathname, currentNumber, navItems) {
  return pathname === "/hymns"
    ? `Гимн ${currentNumber}`
    : pathnamesTitle(pathname);

  function pathnamesTitle(pathname) {
    const selectedItem = navItems.find((item) => `/${item.route}` === pathname);

    return selectedItem ? selectedItem.title : "Поиск";
  }
}
