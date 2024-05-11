import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { Box, Divider, Collapse } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import StyledComponents from "../../../utils/sharedStyles";
import bookmarksStore from "../../services/stores/BookmarksStore";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions/actions";

const { StyledBox, StyledList, StyledTypography } = StyledComponents;

function Bookmarks() {
  const [savedHymns, setSavedHymns] = useState(bookmarksStore.get());
  const lg = useSelector((state) => state.hymns.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(id) {
    dispatch({
      type: actions.SET_CURRENT_NUMBER,
      payload: [id],
    });
    navigate(`/hymns/${id}`);
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
        <StyledTypography>{lg.noData}</StyledTypography>
      )}
    </StyledBox>
  );
}

export default Bookmarks;
