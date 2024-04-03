import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import SubTitlesList from "./SubTitlesList";
import StyledComponents from "../../../utils/sharedStyles";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import titles from "../../services/storage/titles.json";

const { StyledList, StyledBox } = StyledComponents;
function TitlesList({ setCurrentNumber, fontSize }) {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const navigate = useNavigate();

  function ScrollToTittle(id) {
    const element = document.getElementById(id);
    setTimeout(
      () =>
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        }),
      100
    );
  }
  function handleTitleClick(id) {
    setSelectedTitle((prevTitleId) => (prevTitleId === id ? null : id));
    ScrollToTittle(id);
  }

  function handleHymnClick(id) {
    setCurrentNumber([id]);
    navigate(`/hymns/${[id]}`);
  }

  return (
    <StyledBox>
      <StyledList>
        {titles.map((title, index) => (
          <Box key={index}>
            <HymnTitle
              title={title?.name}
              id={title._id}
              hymnsList={titles}
              index={index}
              BorderBottom={Divider}
              onTitleClick={handleTitleClick}
              style={{
                fontWeight: selectedTitle === title._id && "bold",
              }}
            />
            {selectedTitle === title._id && (
              <SubTitlesList
                selectedTitle={selectedTitle}
                handleHymnClick={handleHymnClick}
                ScrollToTittle={ScrollToTittle}
                fontSize={fontSize}
              />
            )}
          </Box>
        ))}
      </StyledList>
    </StyledBox>
  );
}

export default TitlesList;
