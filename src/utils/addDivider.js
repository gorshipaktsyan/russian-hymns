export default function addDivider(BorderBottom, list, index) {
  if (BorderBottom && index !== list.length - 1) {
    const lastIndex = list.length - 1;
    return <BorderBottom key={lastIndex} />;
  }
  return null;
}
