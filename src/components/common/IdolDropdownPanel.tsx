import { Link } from 'react-router';

type Idol = {
  id: number;
  idolId: number;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  img: string;
  name: string;
  enName: string;
};

type Props = {
  idols: Idol[];
  selectedIdolId: number | null;
  setSelectIdol: (idolId: number) => void;
  handleCloseIdolDropdown: () => void;
};

function IdolDropdownPanel({
  idols,
  selectedIdolId,
  setSelectIdol,
  handleCloseIdolDropdown,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      {idols.map(idol => (
        <div key={idol.id}>
          <button
            type="button"
            onClick={() => {
              setSelectIdol(idol.id);
              handleCloseIdolDropdown();
            }}
            className={`flex w-full items-center justify-between px-4 py-2 ${
              selectedIdolId === idol.id && 'bg-gray-100'
            }`}
          >
            {idol.name}
          </button>
        </div>
      ))}
      <div className="p-2 text-center">
        <Link to="/artists">추가 / 편집</Link>
      </div>
    </div>
  );
}

export default IdolDropdownPanel;
