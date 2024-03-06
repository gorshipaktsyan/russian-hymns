import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { Box, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import StyledComponents from "../../../utils/sharedStyles";
import bookmarksStore from "../../services/BookmarksStore";

const { StyledBox, StyledList, StyledTypography } = StyledComponents;

function Bookmarks({ setCurrentNumber }) {
  const [savedHymns, setSavedHymns] = useState(bookmarksStore.get());
  const navigate = useNavigate();

  function handleClick(id) {
    setCurrentNumber([id]);
    navigate(`/hymns/${[id]}`);
  }

  function handleDelete(id) {
    bookmarksStore.remove(id);
    const updatedSavedHymns = bookmarksStore.get();
    setSavedHymns(updatedSavedHymns);
  }
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
                      Icon={DeleteIcon}
                      BorderBottom={Divider}
                      onTitleClick={handleClick}
                      onIconClick={handleDelete}
                    />
                  ))}
                </Box>
              </Collapse>
            ))}
          </TransitionGroup>
        </StyledList>
      ) : (
        <StyledTypography>Нет данных</StyledTypography>
      )}
    </StyledBox>
  );
}

export default Bookmarks;
