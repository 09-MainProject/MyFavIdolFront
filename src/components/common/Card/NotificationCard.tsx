import React from 'react';

type Props = {
  children: React.ReactNode;
};

function NotificationCard({ children }: Props) {
  return (
    <div className="mt-4 flex max-h-[300px] cursor-pointer flex-col rounded-xl p-4 shadow-lg">
      {children}
    </div>
  );
}

export default NotificationCard;
