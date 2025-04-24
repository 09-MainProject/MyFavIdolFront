import { Link } from 'react-router';

type Props = {
  idols: { id: number; name: string }[];
  selectedIdolId: number | null;
  setSelectIdol: (idolId: number) => void;
};

function IdolDropdownPanel({ idols, selectedIdolId, setSelectIdol }: Props) {
  return (
    <div>
      {idols.map(idol => (
        <div key={idol.id}>
          <button
            type="button"
            onClick={() => setSelectIdol(idol.id)}
            className={`flex w-full items-center justify-between px-4 py-2 ${
              selectedIdolId === idol.id && 'bg-gray-100'
            }`}
          >
            {idol.name}
          </button>
        </div>
      ))}
      <div className="text-center">
        <Link to="/artists">추가 / 편집</Link>
      </div>
    </div>
  );
}

export default IdolDropdownPanel;
