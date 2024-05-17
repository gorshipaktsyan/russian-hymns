import React, { useState } from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { useNavigate } from "react-router-dom";
import { Box, Collapse, Divider } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import StyledComponents from "../../../utils/sharedStyles";
import ConfirmModal from "./ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNumber } from "../../../redux/slice/currentNumberSlice";
import { clearHistory } from "../../../redux/slice/historySlice";

const { StyledBox, StyledList, StyledTypography } = StyledComponents;

function History() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const history = useSelector((state) => state.history.searchedHymns);
  const lg = useSelector((state) => state.settings.language);

  function handleClick(id) {
    dispatch(setCurrentNumber([id]));
    navigate(`/hymns/${id}`);
  }

  function handleClearHistory() {
    dispatch(clearHistory());
    setOpenConfirm(false);
  }

  return (
    <>
      <StyledBox>
        {history.length > 0 ? (
          <StyledList>
            <Box
              sx={{
                justifySelf: "center",
                "&:hover": { color: "grey", cursor: "pointer" },
                marginBottom: "10px",
              }}
              onClick={() => setOpenConfirm(true)}
            >
              {lg.history.deleteHistory}
            </Box>
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
      {openConfirm && (
        <ConfirmModal
          lg={lg}
          handleClearHistory={handleClearHistory}
          setOpenConfirm={setOpenConfirm}
          openConfirm={openConfirm}
        />
      )}
    </>
  );
}

export default History;
