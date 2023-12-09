import { useState } from "react";
import { Divider, Box } from "@mui/material";
import hymns from "../../services/storage/hymns.json";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/ArrowBack";
import styled from "@emotion/styled";
import "./index.scss";

const StyledBox = styled(Box)({
  "&:hover": {
    backgroundColor: "rgb(240, 240, 220)",
    cursor: "pointer",
  },
});
function groupItemsBySubtitle(items) {
  const groupedItems = {};

  items.forEach((item) => {
    const subtitle = item.subtitle;

    if (groupedItems[subtitle]) {
      groupedItems[subtitle].push(item);
    } else {
      groupedItems[subtitle] = [item];
    }
  });

  return groupedItems;
}

function SubTitlesList({ selectedTitle, setSelectedTitle, handleHymnClick }) {
  const [expanded, setExpanded] = useState(false);
  const grouped = hymns.filter((hymn) => hymn.title === selectedTitle);
  const groupedItems = groupItemsBySubtitle(grouped);
  console.log("groupedItems", groupedItems);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleBackClick = () => {
    setExpanded(false);
    setSelectedTitle(null);
  };

  return (
    <div className="list-wrapper">
      {Object.keys(groupedItems).map((item) => {
        const hymns = groupedItems[item];
        return (
          <Accordion
            key={item}
            expanded={expanded === item}
            onChange={handleChange(item)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ flexShrink: 0 }}>{item}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {hymns.map((h) => {
                return (
                  <Box
                    sx={{ marginBottom: "10px" }}
                    onClick={() => handleHymnClick(h)}
                  >
                    <StyledBox
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        with: "100%",
                      }}
                    >
                      <Box sx={{ maxWidth: "80%" }}>{h.first_string}</Box>
                      <Box>{h.number}</Box>
                    </StyledBox>
                    <Divider />
                  </Box>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: "30px", right: "30px", backgroundColor: "black", "&:hover": { backgroundColor: "grey" } }}
        onClick={() => handleBackClick()}
      >
        <AddIcon sx={{}} />
      </Fab>
    </div>
  );
}

export default SubTitlesList;
