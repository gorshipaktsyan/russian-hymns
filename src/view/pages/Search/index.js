import { Button } from "@mui/base";
import { FormLabel, TextField, styled } from "@mui/material";
import { FormControl } from "@mui/base/FormControl";
import "./index.scss";
import { Box } from "@mui/system";
function Search() {
  const StyledBox = styled(Box)({
    padding: "0.5em 0.25em 1em 0em",
    textAlign: "center",
  });
  const StyledFormControl = styled(FormControl)({
    margin: "0px auto",
  });
  function handleSubmit() {}
  return (
    <StyledBox>
      <StyledFormControl onSubmit={handleSubmit}>
        <FormLabel>Enter Name</FormLabel>

        <TextField
          name="username"
          label="Поиск"
          placeholder="Enter username"
          fullWidth
        />
        <Button type="submit" color="primary" variant="contained" fullWidth>
          Поиск
        </Button>
      </StyledFormControl>
    </StyledBox>
  );
}

export default Search;
