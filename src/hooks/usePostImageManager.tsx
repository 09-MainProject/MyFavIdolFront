import React, {useState} from 'react';

function usePostImageManager() {
    const [imageFiles, setImageFiles] = useState<File[] | null>([]);
    const [showImages, setShowImages] = useState([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newFiles = files.filter(file =>
            !imageFiles.some(existing =>
                existing.name === file.name && existing.size === file.size
            )
        );
        if (files.length + imageFiles.length > 4) return;

        newFiles.forEach((item) => {
            const reader = new FileReader();
            reader.readAsDataURL(item);
            reader.onload = () => {
                setImageFiles((prev) => [
                    ...prev,
                    item,
                ]);
                setShowImages((prev) => [...prev, reader.result as string]);
            };
        });
    };

    const handleImageDelete = (index: number) => {
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
        setShowImages((prev) => prev.filter((_, i) => i !== index));
    };

    return {showImages, imageFiles, handleImageChange, handleImageDelete};
}

export default usePostImageManager;
