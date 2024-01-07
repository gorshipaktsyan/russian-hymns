import HymnTitle from '../../components/HymnTitle'
import { Divider } from '@mui/material'
import titles from '../../services/storage/titles.json'
import StyledComponents from '../../../utils/sharedStyles'

const { StyledList } = StyledComponents
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
