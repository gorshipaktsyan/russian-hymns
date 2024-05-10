import russian from "../../config/constants/russian";

const hymnsInitState = {
  searchedHymnsListOpen: false,
  drawerOpen: false,
  isMobile: navigator.maxTouchPoints > 0,
  title: "",
  language: russian,
  currentNumber: [],
  contentExpandedList: {
    ContentSelectedTitleId: "",
    ContentSelectedSubtitleId: "",
  },
};

export default hymnsInitState;
