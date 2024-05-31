import { useSelector } from 'react-redux';
import { StyledComponents } from '../../styles';

const { InfoBox } = StyledComponents;

function Reference() {
  const lg = useSelector((state) => state.settings.language);

  return (
    <InfoBox>
      <h3>{lg.reference.search.heading}</h3>
      <p>{lg.reference.search.mobileLocation}</p>
      <p>{lg.reference.search.searchFields}</p>

      <h3>{lg.reference.navigation.heading}</h3>
      <p>{lg.reference.navigation.hymnNavigation}</p>

      <h3>{lg.reference.mainMenu.heading}</h3>
      <p>{lg.reference.mainMenu.openMenu}</p>

      <h3>{lg.reference.alphabeticalIndex.heading}</h3>
      <p>{lg.reference.alphabeticalIndex.indexDescription}</p>

      <h3>{lg.reference.content.heading}</h3>
      <p>{lg.reference.content.description}</p>

      <h3>{lg.reference.history.heading}</h3>
      <p>{lg.reference.history.description}</p>

      <h3>{lg.reference.bookmarks.heading}</h3>
      <p>{lg.reference.bookmarks.description}</p>

      <h3>{lg.reference.settings.heading}</h3>
      <p>{lg.reference.settings.description}</p>

      <h3>{lg.reference.appUpdate.heading}</h3>
      <p>{lg.reference.appUpdate.description}</p>

      <h3>{lg.reference.melodyPlayback.heading}</h3>
      <p>{lg.reference.melodyPlayback.description}</p>
    </InfoBox>
  );
}

export default Reference;
