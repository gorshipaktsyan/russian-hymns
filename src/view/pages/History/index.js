import React, { useMemo, useState } from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { useNavigate } from "react-router-dom";
import { Box, Collapse, Divider } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import StyledComponents from "../../../utils/sharedStyles";
import historyStore from "../../services/HistoryStore";
import persistentStore from "../../services/PersistentStore";
import ConfirmModal from "./ConfirmationModal";
import { useDispatch } from "react-redux";
import actions from "../../../redux/actions/actions";

const { StyledBox, StyledList, StyledTypography } = StyledComponents;

function History() {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useDispatch();

  const [historyUpdated, setHistoryUpdated] = useState(false);
  const groupedHymnsData = useMemo(() => {
    return historyStore.get();
    // eslint-disable-next-line
  }, [historyUpdated]);

  function handleClick(id) {
    dispatch({ type: actions.SET_CURRENT_NUMBER, payload: id });
    navigate(`/hymns/${[id]}`);
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
              Удалить историю
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
          <StyledTypography>Нет данных</StyledTypography>
        )}
      </StyledBox>
      {openConfirm && (
        <ConfirmModal
          handleClearHistory={handleClearHistory}
          setOpenConfirm={setOpenConfirm}
          openConfirm={openConfirm}
        />
      )}
    </>
  );
}

export default History;
