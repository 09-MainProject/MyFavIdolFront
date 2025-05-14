import React, {useState} from 'react';
import {useParams} from 'react-router';
import Input from '@components/common/Input/Input.tsx';
import {useTimelineStore} from '@store/useTimelineStore.ts';

function TimelineEdit() {
    const {posts, updatePost} = useTimelineStore();
    const {id} = useParams();
    const idolDetail = posts.find(idol => idol.id.toString() === id);
    const [form, setForm] = useState({
        id: idolDetail?.id || 1,
        idolId: idolDetail?.idolId || 1,
        title: idolDetail?.title || '',
        type: idolDetail?.type || '',
        startDate: idolDetail?.startDate || '2025-05-03',
        endDate: idolDetail?.endDate || '2025-05-03',
        location: idolDetail?.location || '',
        description: idolDetail?.description || '',
        img: idolDetail?.img || '../src/assets/img/ncity.jpeg',
        name: idolDetail?.name || '',
        enName: idolDetail?.enName || '',
    });

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
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
                updatePost(form);
            }}
            className="mt-12 p-4"
        >
            <h2 className="mb-8 text-2xl font-bold text-gray-800">글 수정하기</h2>

            <div className="mb-6">
                <Input type="text" id="title" name="title" value={form.title} onChange={handleOnChange}
                       variant="lined" label="제목"/>
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
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <button
                    type="submit"
                    className="cursor-pointer rounded bg-black px-6 py-2 text-white transition hover:bg-gray-500"
                >
                    수정 완료
                </button>
            </div>
        </form>
    );
}

export default TimelineEdit;
