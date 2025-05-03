import * as React from 'react';

type Props = {
  isDropdownOpen?: boolean;
  handleToggleIdolDropdown: () => void;
  displayedIdolName?: string;
  children: React.ReactNode;
  mode: 'comment' | 'header';
};
function Dropdown({
  isDropdownOpen,
  handleToggleIdolDropdown,
  displayedIdolName,
  children,
  mode,
}: Props) {
  return (
    <div className={`z-50 inline-block ${mode === 'comment' ? 'ml-auto' : ''}`}>
      <button
        type="button"
        className={`flex items-center ${
          mode === 'comment'
            ? 'rounded-full p-2 hover:bg-gray-100'
            : 'mr-4 rounded-4xl border px-4 py-2 leading-none'
        }`}
        onClick={handleToggleIdolDropdown}
      >
        {displayedIdolName}
      </button>
      {isDropdownOpen && (
        <div
          className={`absolute z-50 rounded-md bg-white shadow-lg ${
            mode === 'comment'
              ? 'top-4 right-0 mt-2 w-[100px]'
              : 'top-full right-0 mt-2 w-40'
          }`}
        >
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  );
}
export default Dropdown;
