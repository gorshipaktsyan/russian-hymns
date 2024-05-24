import { setIsSaved } from "../redux/slice/appBarSlice";

export default function showBookmark({
  dispatch,
  formatedData,
  currentHymnNumber,
}) {
  if (currentHymnNumber && formatedData.length) {
    const isSaved = formatedData.some((day) =>
      day.hymns.some((h) => h.number === currentHymnNumber)
    );
    dispatch(setIsSaved(isSaved));
  }
}
