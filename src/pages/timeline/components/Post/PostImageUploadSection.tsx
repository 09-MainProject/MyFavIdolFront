import React from 'react';
import {Trash} from '@assets/icons/inedx.ts';

type  Props = {
    showImages: string[];
    handleImageDelete: (index: number) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PostImageUploadSection({showImages, handleImageDelete, handleImageChange}: Props) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {showImages.map((image: string, i: number) => (
                    <div key={image} className="relative aspect-square overflow-hidden border border-gray-300">
                        <picture className="absolute top-0 left-0 w-full h-full">
                            <img src={image} alt={image} className="w-full h-full object-cover"/>
                        </picture>
                        <button
                            type="button"
                            onClick={() => handleImageDelete(i)}
                            className="cursor-pointer absolute top-0 left-0 w-full h-full opacity-0 flex justify-center items-center hover:opacity-70 hover:bg-black"
                        >
                            <Trash/>
                        </button>
                    </div>
                ))}
            </div>
            <div
                className="flex items-center justify-center size-[200px] border border-gray-300 cursor-pointer mb-4 relative">
                <label htmlFor="inputFile"
                       className="cursor-pointer w-full h-full text-2xl text-center text-gray-500 leading-[200px]">
                    +
                    <input
                        type="file"
                        id="inputFile"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
            </div>
        </>
    );
}

export default PostImageUploadSection;