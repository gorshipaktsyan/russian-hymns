import React, { useMemo } from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { useNavigate } from "react-router-dom";
import { Box, Collapse, Divider } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import StyledComponents from "../../../utils/sharedStyles";
import historyStore from "../../services/HistoryStore";
const { StyledBox, StyledList, StyledTypography } = StyledComponents;

function History({ setCurrentNumber, historyUpdated }) {
  const navigate = useNavigate();
  const groupedHymnsData = useMemo(() => {
    return historyStore.get("searchedHymns");
    // eslint-disable-next-line
  }, [historyUpdated]);

  function handleClick(id) {
    setCurrentNumber([id]);
    navigate("/");
  }

  return (
    <>
      <StyledBox>
        {groupedHymnsData.length > 0 ? (
          <StyledList>
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
    </>
  );
}

export default History;
