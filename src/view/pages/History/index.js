import React, { useMemo, useState } from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { useNavigate } from "react-router-dom";
import { Box, Collapse, Divider } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import StyledComponents from "../../../utils/sharedStyles";
import { persistentStore, historyStore } from "../../services/index";
import ConfirmModal from "./ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions/actions";

const { StyledBox, StyledList, StyledTypography } = StyledComponents;

function History() {
  const lg = useSelector((state) => state.hymns.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [historyUpdated, setHistoryUpdated] = useState(false);
  const groupedHymnsData = useMemo(() => {
    return historyStore.get();
    // eslint-disable-next-line
  }, [historyUpdated]);

  function handleClick(id) {
    dispatch({
      type: actions.SET_CURRENT_NUMBER,
      payload: [id],
    });
    navigate(`/hymns/${id}`);
  }
  function handleClearHistory() {
    persistentStore.clear("searchedHymns");
    setHistoryUpdated(true);
    setOpenConfirm(false);
  }

  return (
    <>
      <StyledBox>
        {groupedHymnsData.length > 0 ? (
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
              {groupedHymnsData.map(({ date, hymns }) => (
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
