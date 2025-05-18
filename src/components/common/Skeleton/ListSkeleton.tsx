import React from 'react';

function ListSkeleton() {
    return (
        <div className="w-full animate-pulse">
            <div className="mx-auto w-full  rounded-md p-4">
                <div className="flex animate-pulse space-x-4">
                    <div className="size-10 rounded-full bg-gray-200"/>
                    <div className="w-[200px] space-y-4 py-1">
                        <div className="h-2 rounded bg-gray-200"/>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2 h-2 rounded bg-gray-200"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col overflow-hidden pb-4 border-b border-gray-300">
                <div className="aspect-video overflow-hidden border rounded-sm border-[#EFEFEF] bg-gray-200"/>

                <div className="flex items-center gap-6 px-3 py-3 text-sm text-gray-600">
                    <div className="h-4 w-14 bg-gray-300 rounded"/>
                    <div className="h-4 w-12 bg-gray-300 rounded"/>
                </div>

                <div className="px-3">
                    <div className="h-4 w-full bg-gray-300 rounded mb-2"/>
                    <div className="h-4 w-2/3 bg-gray-300 rounded"/>
                </div>
            </div>

        </div>
    );
}

export default ListSkeleton;