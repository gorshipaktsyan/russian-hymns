import { setIsSaved } from "../redux/slice/appBarSlice";

export default function showBookmark({
  dispatch,
  savedHymnsList,
  currentHymnNumber,
}) {
  if (currentHymnNumber && savedHymnsList) {
    const isSaved = savedHymnsList.some((day) =>
      day.hymns.some((h) => h.number === currentHymnNumber)
    );
    dispatch(setIsSaved(isSaved));
  }
}
