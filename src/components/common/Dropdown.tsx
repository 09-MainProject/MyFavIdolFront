import * as React from 'react';

type Props = {
  isDropdownOpen: boolean;
  handleToggleIdolDropdown: () => void;
  displayedIdolName: string;
  children: React.ReactNode;
};

function Dropdown({
  isDropdownOpen,
  handleToggleIdolDropdown,
  displayedIdolName,
  children,
}: Props) {
  return (
    <div className="relative mr-4 rounded-4xl border px-4 py-2 leading-none">
      <button
        type="button"
        className="flex items-center leading-none"
        onClick={handleToggleIdolDropdown}
      >
        {displayedIdolName}
      </button>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 z-10 mt-2 w-40 rounded bg-white shadow">
          {children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
