import React from "react";
import ListItem from "../../components/ListItem";
import { useNavigate } from "react-router-dom";
import { Box, Collapse, Divider } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { StyledComponents, formatData } from "../../../utils/index";
import ConfirmModal from "./ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNumber } from "../../../redux/slice/currentNumberSlice";
import {
  clearHistory,
  setIsConfirmOpen,
} from "../../../redux/slice/historySlice";
import StyledHistoryComponents from "./styles";

const { StyledBox, StyledList, StyledTypography } = StyledComponents;
const { StyledDeleteHistoryText } = StyledHistoryComponents;

function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isConfirmOpen = useSelector((state) => state.history.isConfirmOpen);
  const history = useSelector((state) => state.history.searchedHymns);
  const lg = useSelector((state) => state.settings.language);
  const hymns = useSelector((state) => state.hymns.hymns);

  function handleClick(id) {
    dispatch(setCurrentNumber([id]));
    navigate(`/hymns/${id}`);
  }

  function handleClearHistory() {
    dispatch(clearHistory());
    dispatch(setIsConfirmOpen(false));
  }
  const formatedData = formatData(history, hymns, lg);

  return (
    <>
      <StyledBox>
        {formatedData.length > 0 ? (
          <StyledList>
            <StyledDeleteHistoryText
              onClick={() => dispatch(setIsConfirmOpen(true))}
            >
              {lg.history.deleteHistory}
            </StyledDeleteHistoryText>
            <TransitionGroup>
              {formatedData.map(({ date, hymns }) => (
                <Collapse key={date}>
                  <Box sx={{ paddingBottom: "20px" }}>
                    <Divider>{date}</Divider>
                    {hymns.map((h, index) => (
                      <ListItem
                        key={h._id}
                        title={h?.first_string}
                        number={h?.number}
                        id={h._id}
                        list={hymns}
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
