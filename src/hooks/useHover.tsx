import { useState, useCallback, HTMLProps } from 'react';

type HoverAttrs = HTMLProps<HTMLDivElement>;

const useHover = (): [boolean, HoverAttrs] => {
  const [hovering, setHovering] = useState(false);

  const handleMouseOver = useCallback(() => {
    setHovering(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setHovering(false);
  }, []);

  const attrs: HoverAttrs = {
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
  };

  return [hovering, attrs];
};

export default useHover;
