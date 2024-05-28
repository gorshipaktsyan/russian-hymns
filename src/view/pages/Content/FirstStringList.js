import { useNavigate } from "react-router-dom";
import { setCurrentNumber } from "../../../redux/slice/currentNumberSlice";
import ListItem from "../../components/ListItem";
import StyledContentComponents from "./styles";

const { StyledFirstStringList } = StyledContentComponents;

export default function FirstStringList({
  firstStringList,
  Divider,
  dispatch,
}) {
  const navigate = useNavigate();

  function handleHymnClick(id) {
    dispatch(setCurrentNumber([id]));
    navigate(`/hymns/${id}`);
  }

  return (
    <StyledFirstStringList>
      {firstStringList.map((h, index) => (
        <ListItem
          key={h._id}
          title={h.first_string}
          number={h.number}
          id={h._id}
          list={firstStringList}
          index={index}
          BorderBottom={Divider}
          onTitleClick={handleHymnClick}
          style={{
            fontSize: "15px",
          }}
        />
      ))}
    </StyledFirstStringList>
  );
}
