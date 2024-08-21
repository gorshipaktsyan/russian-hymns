export default function scrollToContentTittle(id: string): void {
  const element = document.getElementById(id) as HTMLElement;
  setTimeout(
    () =>
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      }),
    100
  );
}
