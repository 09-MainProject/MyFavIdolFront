import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Frame } from '@assets/icons/inedx';
import Dropdown from '@components/common/Dropdown';
import { UserComment } from '@/mocks/data/comment';

type Props = {
  value: {
    type: 'edit' | 'reply';
    id: string;
    value: string;
  };
  allComments: UserComment[];
  item: UserComment;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnRemove: (targetId: string) => void;
  handleOnEdit: () => void;
  handleEditInit: (targetId: string, content: string) => void;
  handleReplyInit: (targetId: string) => void;
  handleOnReply: (parentId: string) => void;
  activeInput: {
    type: 'edit' | 'reply';
    id: string;
  } | null;
};

function CommentItem({
  item,
  handleOnRemove,
  handleOnChange,
  handleOnReply,
  activeInput,
  allComments,
  handleEditInit,
  handleReplyInit,
  handleOnEdit,
  value,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIdolDropdownOpen, setIsIdolDropdownOpen] = useState<string | null>(
    null
  );

  const handleToggleIdolDropdown = useCallback((commentId: string) => {
    setIsIdolDropdownOpen(prev => (prev === commentId ? null : commentId));
  }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsIdolDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handle);
  }, [ref]);

  return (
    <li className="relative w-full border-b border-gray-100 last:border-none">
      <div className="flex w-full items-start gap-4 pr-12">
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200" />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">
              {item.parentId && <span className="text-blue-500">답글 · </span>}
              {item.author}
            </span>
            <span className="text-xs text-gray-400">{item.createdAt}</span>
          </div>

          <p className="mt-1 text-sm whitespace-pre-wrap text-gray-900">
            {item.content}
          </p>

          {activeInput?.id === item.id && (
            <form className="mt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={value.value}
                  onChange={handleOnChange}
                  className="flex-1 rounded border border-gray-300 p-2 text-sm"
                  placeholder={
                    activeInput.type === 'reply' ? '답글을 입력하세요' : ''
                  }
                />
                <button
                  type="button"
                  onClick={
                    activeInput.type === 'reply'
                      ? () => handleOnReply(item.id)
                      : handleOnEdit
                  }
                  className="rounded bg-blue-500 px-4 py-1.5 text-sm text-white"
                >
                  저장
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="absolute top-4 right-4" ref={ref}>
        <button
          type="button"
          onClick={() => handleToggleIdolDropdown(item.id)}
          className="text-gray-400 hover:text-gray-600"
        >
          <Frame />
        </button>
        <Dropdown
          isDropdownOpen={isIdolDropdownOpen === item.id}
          handleToggleIdolDropdown={() => handleToggleIdolDropdown(item.id)}
          mode="comment"
        >
          <div>
            <button
              type="button"
              onClick={() => {
                handleReplyInit(item.id);
                handleToggleIdolDropdown(item.id);
              }}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              답글 달기
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleEditInit(item.id, item.content)}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              수정
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleOnRemove(item.id)}
              className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50"
            >
              삭제
            </button>
          </div>
        </Dropdown>
      </div>
      <ul className="mt-4 space-y-4">
        {allComments
          .filter(reply => reply.parentId === item.id)
          .map(reply => (
            <CommentItem
              key={reply.id}
              item={reply}
              allComments={allComments}
              activeInput={activeInput}
              value={value}
              handleOnChange={handleOnChange}
              handleOnRemove={handleOnRemove}
              handleOnEdit={handleOnEdit}
              handleEditInit={handleEditInit}
              handleReplyInit={handleReplyInit}
              handleOnReply={handleOnReply}
            />
          ))}
      </ul>
    </li>
  );
}

export default CommentItem;
