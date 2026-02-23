import { useMediaQuery } from 'react-responsive';

const useButtonSize = () => {
  const mobile = useMediaQuery({ query: '(max-width: 39.9375em)' });
  const tablet = useMediaQuery({ query: '(min-width: 40em) and (max-width: 63.9375em)' });
  const desktop = useMediaQuery({ query: '(min-width: 40em)'});


  let buttonSize = '';
  if (mobile) {
    buttonSize = 'smallFeed';
  } else if (desktop) {
    buttonSize = 'mediumFeed';
  } 

  return buttonSize;
};

export default useButtonSize;