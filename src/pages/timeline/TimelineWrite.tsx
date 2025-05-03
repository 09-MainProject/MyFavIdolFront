import React, { useState } from 'react';
import { useTimelineStore } from '@store/useTimelineStore';

function TimelineWrite() {
  const { addPost } = useTimelineStore();
  const [form, setForm] = useState({
    id: Number(new Date().getTime()),
    idolId: Number(new Date().getTime()),
    title: '트와이스 팬미팅',
    type: '팬미팅',
    startDate: '2025-05-03',
    endDate: '2025-05-03',
    location: '서울 올림픽홀',
    description: '2025년 상반기 팬미팅',
    img: '../src/assets/img/ncity.jpeg',
    name: '트와이스',
    enName: 'twice',
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setForm(prev => ({
        ...prev,
        img: reader.result as string,
      }));
    };
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addPost(form);
      }}
    >
      <h2 className="mt-20 mb-8 text-2xl font-bold text-gray-800">
        게스글 작성
      </h2>

      <div className="mb-6">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          제목
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleOnChange}
            className="mt-4 w-full border-b border-gray-200 p-3 text-sm outline-none"
            placeholder="제목을 입력하세요"
            required
          />
        </label>
      </div>

      <div className="mb-8">
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          내용
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleOnChange}
            placeholder="내용을 입력하세요"
            className="mt-4 h-48 w-full resize-none rounded-md border border-gray-300 p-3 text-sm"
            required
          />
        </label>
      </div>

      <div className="flex justify-end">
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button
          type="submit"
          className="cursor-pointer rounded bg-black px-6 py-2 text-white transition hover:bg-gray-500"
        >
          작성 완료
        </button>
      </div>
    </form>
  );
}

export default TimelineWrite;
