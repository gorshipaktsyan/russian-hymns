import titlesService from '../services/titlesService';
import { titles } from '../storage';

describe('titlesService', () => {
  it('should return all titles', () => {
    const result = titlesService.get();
    expect(result).toEqual(titles);
  });
});
