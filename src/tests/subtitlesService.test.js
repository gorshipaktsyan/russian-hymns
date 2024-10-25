import subtitlesService from '../services/subtitlesService';
import { subtitles } from '../storage';

import testConfig from './config/constants';

describe('subtitlesService', () => {
  it('should return all subtitles', () => {
    const result = subtitlesService.get();
    expect(result).toEqual(subtitles);
  });
  it('should filter subtitles by title id', () => {
    const result = subtitlesService.filterSubsByTitleId(testConfig.titleId);
    const expected = subtitles.filter((sub) => sub.title === testConfig.titleId);

    expect(result).toEqual(expected);
  });
});
