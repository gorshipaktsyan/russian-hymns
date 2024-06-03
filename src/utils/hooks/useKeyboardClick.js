import { useEffect } from 'react';

function useKeyboardNavigation(handleLeftSwipe, handleRightSwipe) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handleRightSwipe();
      } else if (event.key === 'ArrowRight') {
        handleLeftSwipe();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleRightSwipe, handleLeftSwipe]);
}

function useEnterKeySubmit(handleSubmit) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit]);
}

export { useEnterKeySubmit, useKeyboardNavigation };
