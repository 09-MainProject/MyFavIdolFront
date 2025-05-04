import React, { useState } from 'react';
import { mockComments, UserComment } from '@/mocks/data/comment.ts';

function useCommentHandlers() {
  const [comment, setComment] = useState<UserComment[]>(mockComments);
  const [activeInput, setActiveInput] = useState<{
    type: 'edit' | 'reply';
    id: string;
    value: string;
  } | null>(null);

  const handleEditInit = (targetId: string, content: string) => {
    setActiveInput({ type: 'edit', id: targetId, value: content });
  };

  const handleOnEdit = () => {
    setComment(prev =>
      prev.map(item =>
        item.id === activeInput.id
          ? { ...item, content: activeInput.value }
          : item
      )
    );
    setActiveInput({ type: 'edit', id: '', value: '' });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveInput(prev => prev && { ...prev, value: e.target.value });
  };

  const handleOnRemove = (targetId: string) => {
    setComment(prev => prev.filter(comments => comments.id !== targetId));
  };

  const handleReplyInit = (targetId: string) => {
    setActiveInput({ type: 'reply', id: targetId, value: '' });
  };

  const handleOnReply = (parentId: string) => {
    const newReply = {
      id: new Date().toISOString(),
      content: activeInput.value,
      img: '../src/assets/img/ncity.jpeg',
      author: 'hhhh',
      createdAt: new Date().toISOString(),
      parentId,
    };
    setComment(prev => [...prev, newReply]);

    setActiveInput({ type: 'reply', id: '', value: '' });
  };

  return {
    comment,
    activeInput,
    handleEditInit,
    handleOnEdit,
    handleOnChange,
    handleReplyInit,
    handleOnReply,
    handleOnRemove,
  };
}

export default useCommentHandlers;
