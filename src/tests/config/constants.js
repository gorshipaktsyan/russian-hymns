const testConfig = {
  text: 'я созерцаю',
  letterForFiltering: 'Ш',
  hymnNumber: 1,
  hymnsNumbers: [1, 2],
  rusNumbers: '1, 3,999',
  rusSearchName: 'number',
  engNumbers: '5, 6,99999',
  engSearchName: 'number_eng',
  titleId: 1,
  subtitleId: 1,
  arrayForSorting: [
    {
      first_string: 'Благословение',
      filteredText: 'благословение'
    },
    {
      first_string: 'Божественная',
      filteredText: 'божественная'
    },
    {
      first_string: 'Благодарение',
      filteredText: 'благодарение'
    },
    {
      first_string: 'Благая весть',
      filteredText: 'благая весть'
    }
  ],
  expectedSortedArray: [
    {
      filteredText: 'благая весть',
      first_string: 'Благая весть'
    },
    {
      first_string: 'Благодарение',
      filteredText: 'благодарение'
    },
    {
      first_string: 'Благословение',
      filteredText: 'благословение'
    },
    {
      first_string: 'Божественная',
      filteredText: 'божественная'
    }
  ],
  nonExistentHymnNumber: 9999
};

export default testConfig;
