export default function findLocation(pathname, currentNumber, navItems) {
  return pathname === "/" ? `Гимн ${currentNumber}` : pathnamesTitle(pathname);

  function pathnamesTitle(pathname) {
    const selectedItem = navItems.find((item) => `/${item.route}` === pathname);

    return selectedItem ? selectedItem.title : `Гимн ${currentNumber}`;
  }
}
