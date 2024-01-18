import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { Box, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import historyStore from "../../services/HistoryStore";
import StyledComponents from "../../../utils/sharedStyles";
import BookmarksStyledComponents from "./styles";
import bookmarksStore from "../../services/BookmarksStore";

const { StyledBox, StyledList, StyledTypography } = StyledComponents;
// const { StyledOpenButton } = BookmarksStyledComponents

function Bookmarks({ setCurrentNumber }) {
  const savedHymnsData = useMemo(() => {
    return bookmarksStore.get("savedHymns");
  }, []);
  const [savedHymns, setSavedHymns] = useState(savedHymnsData);
  // const [selectedHymns, setSelectedHymns] = useState([])
  const navigate = useNavigate();

  function handleClick(ids) {
    const hymnIds = historyStore.set("searchedHymns", ids);
    setCurrentNumber(hymnIds);
    navigate("/russian-hymns");
  }

  function handleDelete(id) {
    const updatedSavedHymns = savedHymns.map((day) => ({
      date: day.date,
      hymns: day.hymns.filter((hymn) => hymn.number !== id),
    }));

    setSavedHymns(updatedSavedHymns);
    bookmarksStore.remove("savedHymns", id);
  }
  // const handleCheckboxChange = id => {
  //   setSelectedHymns(prevSelected =>
  //     prevSelected.includes(id)
  //       ? prevSelected.filter(selectedId => selectedId !== id)
  //       : [...prevSelected, id]
  //   )
  // }

  return (
    <StyledBox>
      {savedHymns.length > 0 ? (
        <StyledList>
          <TransitionGroup>
            {savedHymns.map(({ date, hymns }) => (
              <Collapse key={date}>
                <Box sx={{ paddingBottom: "20px" }}>
                  <Divider>{date}</Divider>
                  {hymns.map((h, index) => (
                    <HymnTitle
                      title={h?.first_string}
                      number={h?.number}
                      id={h._id}
                      hymnsList={hymns}
                      index={index}
                      // selectedHymns={selectedHymns}
                      Icon={DeleteIcon}
                      BorderBottom={Divider}
                      // onCheckBoxClick={handleCheckboxChange}
                      onTitleClick={handleClick}
                      onIconClick={handleDelete}
                    />
                  ))}
                </Box>
              </Collapse>
            ))}
          </TransitionGroup>
          {/* {selectedHymns.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <StyledOpenButton onClick={() => handleClick(selectedHymns)}>
                Открыть
              </StyledOpenButton>
            </Box>
          )} */}
        </StyledList>
      ) : (
        <StyledTypography>Нет данных</StyledTypography>
      )}
    </StyledBox>
  );
}

export default Bookmarks;
