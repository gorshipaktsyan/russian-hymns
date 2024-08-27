import HymnType from './hymnType';

export interface UseSwipeNavigationProps {
  currentHymns: HymnType[];
  navigate: (path: string) => void;
}
export interface SwipeEvent {
  event?: React.SyntheticEvent | Event;
  stopPropagation: () => void;
}
