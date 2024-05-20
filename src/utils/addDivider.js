export default function addDivider(BorderBottom, hymnsList, index) {
  if (BorderBottom && index !== hymnsList.length - 1) {
    const lastIndex = hymnsList.length - 1;
    return <BorderBottom key={lastIndex} />;
  }
  return null;
}
