import { useEffect, useState } from 'react';

function ScrollTop() {
  const [showBtn, setShowBtn] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowBtn = () => {
      if (window.scrollY > 500) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };

    window.addEventListener('scroll', handleShowBtn);
    return () => {
      window.addEventListener('scroll', handleShowBtn);
    };
  }, []);

  return (
    showBtn && (
      <div className="fixed right-6 bottom-6 z-50 rounded-[50px] border-[1px] border-white">
        <button
          onClick={scrollToTop}
          type="button"
          className="h-[50px] w-[50px] rounded-[50px] bg-black text-white"
        >
          Top
        </button>
      </div>
    )
  );
}

export default ScrollTop;
