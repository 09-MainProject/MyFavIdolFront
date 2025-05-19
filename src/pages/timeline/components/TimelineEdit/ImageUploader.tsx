import React from 'react';
import {Trash} from '@assets/icons/inedx';

interface ImageUploaderProps {
    showImages: string[];
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onImageDelete: (index: number) => void;
}

export function ImageUploader({showImages, onImageChange, onImageDelete}: ImageUploaderProps) {
    return (
        <>
            <div className="mb-4">
                {showImages.length > 0 && (
                    <div className="relative aspect-square overflow-hidden border border-gray-300">
                        <picture className="absolute top-0 left-0 w-full h-full">
                            <img src={showImages[0]} alt="post"
                                 className="w-full h-full object-cover"/>
                        </picture>
                        <button 
                            type="button" 
                            onClick={() => onImageDelete(0)}
                            className="cursor-pointer absolute top-0 left-0 w-full h-full opacity-0 flex justify-center items-center hover:opacity-70 hover:bg-black"
                        >
                            <Trash/>
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-center size-[200px] border border-gray-300 cursor-pointer mb-4 relative">
                <label 
                    htmlFor="inputFile"
                    className="cursor-pointer justify-center w-full h-full li items-center absolute leading-[200px] text-2xl text-center text-gray-500"
                >
                    +
                    <input
                        type="file"
                        id="inputFile"
                        accept="image/*"
                        onChange={onImageChange}
                        className="hidden"
                    />
                </label>
            </div>
        </>
    );
} 