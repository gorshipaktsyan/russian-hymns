import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { changeFontSize } from '../../redux/slice/settingsSlice';
import { UseDoubleTap } from '../../types';
import { doubleTap } from '..';

export default function useDoubleTap({ pathname, fontSize }: UseDoubleTap) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!dispatch) {
      return;
    }

    function handleClick(e: MouseEvent) {
      if (pathname !== '/settings') {
        const newFontSize = doubleTap(e, fontSize);

        if (newFontSize !== fontSize) {
          dispatch(changeFontSize(newFontSize));
        }
      }
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [dispatch, fontSize, pathname]);
}
