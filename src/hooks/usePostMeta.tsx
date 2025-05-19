import React, { useEffect, useState } from 'react';

function UsePostMeta() {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(0);
  const [view, setView] = useState(0);
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setCount(prev => (isLike === true ? prev - 1 : prev + 1));
    setIsLike(prev => !prev);
  };

  useEffect(() => {
    setView(prev => prev + 1);
  }, []);

  return { count, view, handleLike };
}

export default UsePostMeta;
