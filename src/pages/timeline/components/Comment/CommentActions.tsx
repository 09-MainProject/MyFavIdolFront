type Props = {
    commentId: string;
    isParent: boolean;
    isLoggedIn: boolean;
    onClick: (commentId: string) => void;
};

function ReplyButton({
                         commentId,
                         isParent,
                         isLoggedIn,
                         onClick,
                     }: Props) {
    if (!isParent || !isLoggedIn) return null;

    return (
        <div>
            <button
                type="button"
                onClick={() => onClick(commentId)}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
                답글 달기
            </button>
        </div>
    );
}

function EditButton({onClick}: { onClick: () => void }) {
    return (
        <div>
            <button
                type="button"
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                onClick={onClick}
            >
                수정
            </button>
        </div>
    );
}

function DeleteButton({
                          onClick,
                          isAll,
                      }: {
    onClick: () => void;
    isAll?: boolean;
}) {
    return (
        <div>
            <button
                type="button"
                className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50"
                onClick={onClick}
            >
                {isAll ? '전체 삭제' : '삭제'}
            </button>
        </div>
    );
}

export {ReplyButton, EditButton, DeleteButton};
