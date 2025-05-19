import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
function CardFrame({ children }: Props) {
  return (
    <div className="rounded-xl bg-white shadow transition-shadow duration-300 hover:shadow-lg">
      {children}
    </div>
  );
}

export default CardFrame;
