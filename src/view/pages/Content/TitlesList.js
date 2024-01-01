import HymnTitle from '../../components/HymnTitle'
import { List, Divider } from '@mui/material'
import styled from '@emotion/styled'
import titles from '../../services/storage/titles.json'
import './index.scss'

const StyledList = styled(List)({
  width: '100%',
  paddingBottom: '100px',
  maxWidth: '400px'
})
function TitlesList ({ handleTitleClick }) {
  return (
    <StyledList>
      {titles.map((title, index) => (
        <HymnTitle
          title={title?.name}
          id={title._id}
          hymnsList={titles}
          index={index}
          BorderBottom={Divider}
          onTitleClick={handleTitleClick}
        />
      ))}
    </StyledList>
  )
}

export default TitlesList
