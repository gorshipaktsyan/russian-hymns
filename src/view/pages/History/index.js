import React, { useMemo, useState } from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { useNavigate } from "react-router-dom";
import { Box, Collapse, Divider, Fab } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import StyledComponents from "../../../utils/sharedStyles";
import historyStore from "../../services/HistoryStore";
import ClearIcon from "../../../assets/icons/Clear.png";
import persistentStore from "../../services/PersistentStore";
import ConfirmModal from "./ConfirmationModal";
const { StyledBox, StyledList, StyledTypography, StyledFab } = StyledComponents;

function History({ setCurrentNumber }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const groupedHymnsData = useMemo(() => {
    return historyStore.get("searchedHymns");
  }, []);
  const [groupedHymns, setGroupedHymns] = useState(groupedHymnsData);

  function handleClick(id) {
    setCurrentNumber([id]);
    navigate("/russian-hymns");
  }
  function handleClear() {
    persistentStore.clear("searchedHymns");
    setGroupedHymns([]);
    setOpen(false);
  }

  return (
    <>
      <StyledBox>
        {groupedHymns.length > 0 ? (
          <StyledList>
            <TransitionGroup>
              {groupedHymns.map(({ date, hymns }) => (
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
        <StyledFab onClick={() => setOpen(true)}>
          <img
            src={ClearIcon}
            alt="Clear Icon"
            style={{ width: "24px", height: "24px" }}
          ></img>
        </StyledFab>
      </StyledBox>
      {open && (
        <ConfirmModal handleClear={handleClear} setOpen={setOpen} open={open} />
      )}
    </>
  );
}

export default History;
