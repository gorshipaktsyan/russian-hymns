import { useSelector } from "react-redux";
import ListItem from "../../components/ListItem";
import SearchIcon from "@mui/icons-material/Search";
import { StyledComponents, filterHymnsByLetter } from "../../../utils";

const { StyledBox, StyledList, StyledFab } = StyledComponents;

function HymnsList({
  handleTitleClick,
  letter,
  handleBackClick,
  isMobile,
  lg,
}) {
  const hymns = useSelector((state) => state.hymns.hymns);
  const filteredHymnsByLetter = filterHymnsByLetter(letter, lg, hymns);

  return (
    <StyledBox>
      <StyledList>
        {filteredHymnsByLetter.map((h, index) => (
          <ListItem
            key={h._id}
            title={
              h.filteredByFirstLetter ? h.first_string : h.chorus_first_string
            }
            number={h.number}
            id={h._id}
            list={filteredHymnsByLetter}
            index={index}
            onTitleClick={handleTitleClick}
          />
        ))}
      </StyledList>
      {isMobile && (
        <StyledFab color="primary" aria-label="add" onClick={handleBackClick}>
          <SearchIcon />
        </StyledFab>
      )}
    </StyledBox>
  );
}

export default HymnsList;
