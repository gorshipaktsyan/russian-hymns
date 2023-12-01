import {List, ListItem} from "@mui/material";
import './index.scss'

const RussianAlphabetCapital = [
  'А', 'Б', 'В', 'Г', 'Д',
  'Е', 'Ж', 'З', 'И', 'К',
  'Л', 'М', 'Н', 'О', 'П',
  'Р', 'С', 'Т', 'У', 'Х',
  'Ц', 'Ч', 'Ш', 'Щ', 'Ъ',
  'Ы', 'Ь', 'Э', 'Ю', 'Я'
];

function AlphabeticalIndex() {

  function handleLetterClick(letter) {
    alert(letter)
  }

  return (
      <div className='alphabetical-page'>
        <List className='list-wrapper'>
          {RussianAlphabetCapital.map((letter) => (
              <ListItem className='letter' key={letter} onClick={() => handleLetterClick(letter)}>
                {letter}
              </ListItem>
          ))}
        </List>
      </div>
  )
}

export default AlphabeticalIndex;
