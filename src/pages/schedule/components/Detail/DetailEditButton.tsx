type Props = {
    scheduleId: string;
    idolId: string;
    onNavigate: (path: string, state: { idolId: string }) => void;
};

function DetailEditButton({scheduleId, idolId, onNavigate}: Props) {
    return (
        <div className="mt-8 flex justify-end gap-3">
            <button
                type="button"
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white  "
                onClick={() => onNavigate(`/schedule/${scheduleId}/edit`, {idolId})}
            >
                수정하기
            </button>
        </div>
    );
}

export default DetailEditButton;