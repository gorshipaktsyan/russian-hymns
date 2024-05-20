import React from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { useNavigate } from "react-router-dom";
import { Box, Collapse, Divider } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import StyledComponents from "../../../utils/sharedStyles";
import ConfirmModal from "./ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNumber } from "../../../redux/slice/currentNumberSlice";
import {
  clearHistory,
  setIsConfirmOpen,
} from "../../../redux/slice/historySlice";
import StyledHistoryComponents from "./styles";

const { StyledBox, StyledList, StyledTypography } = StyledComponents;
const { StyledDeleteText } = StyledHistoryComponents;

function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isConfirmOpen = useSelector((state) => state.history.isConfirmOpen);
  const history = useSelector((state) => state.history.searchedHymns);
  const lg = useSelector((state) => state.settings.language);

  function handleClick(id) {
    dispatch(setCurrentNumber([id]));
    navigate(`/hymns/${id}`);
  }

  function handleClearHistory() {
    dispatch(clearHistory());
    dispatch(setIsConfirmOpen(false));
  }

  return (
    <>
      <StyledBox>
        {history.length > 0 ? (
          <StyledList>
            <StyledDeleteText onClick={() => dispatch(setIsConfirmOpen(true))}>
              {lg.history.deleteHistory}
            </StyledDeleteText>
            <TransitionGroup>
              {history.map(({ date, hymns }) => (
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
                        BorderBottom={Divider}
                        onTitleClick={handleClick}
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
      {isConfirmOpen && (
        <ConfirmModal
          lg={lg}
          handleClearHistory={handleClearHistory}
          isConfirmOpen={isConfirmOpen}
          dispatch={dispatch}
        />
      )}
    </>
  );
}

export default History;
