import { useState } from "react";
import hymns from "../../services/storage/hymns.json";
import Subtitles from "../../services/storage/subtitles.json"
import { Divider, Box } from "@mui/material";
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

function SubTitlesList({ selectedTitle, setSelectedTitle, handleHymnClick }) {
  const [expanded, setExpanded] = useState(false);
  const grouped = hymns.filter((hymn) => hymn.title === selectedTitle);
  const subtitles = Subtitles.filter((sub) => sub.title === selectedTitle)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleBackClick = () => {
    setExpanded(false);
    setSelectedTitle(null);
  };

  return (
    <div className="list-wrapper">
      {subtitles.map((subtitle) => {
        const hymns = grouped.filter((h) => h.subtitle === subtitle._id);
        return (
          <Accordion
            key={subtitle._id}
            expanded={expanded === subtitle._id}
            onChange={handleChange(subtitle._id)}
            sx={{ backgroundColor: "#ffffe7" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography key={subtitle._id} sx={{ flexShrink: 0 }}>
                {subtitle.name_upper}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {hymns.map((h) => (
                <Box
                  key={h._id}
                  sx={{ marginBottom: "10px" }}
                  onClick={() => handleHymnClick(h)}
                >
                  <StyledBox
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ maxWidth: "80%" }}>{h.first_string}</Box>
                    <Box>{h.number}</Box>
                  </StyledBox>
                  <Divider />
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "black",
          "&:hover": { backgroundColor: "grey" },
        }}
        onClick={handleBackClick}
      >
        <AddIcon sx={{}} />
      </Fab>
    </div>
  );
}

export default SubTitlesList;