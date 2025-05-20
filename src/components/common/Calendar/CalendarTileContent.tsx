const TYPE_LABEL = {
    팬미팅: {color: 'bg-blue-500'},
    공연: {color: 'bg-red-500'},
    방송: {color: 'bg-green-500'},
    Etc: {color: 'bg-gray-400'},
};

function CalendarTileContent({filterIdols}: { filterIdols: string }) {
    const type = TYPE_LABEL[filterIdols] ?? TYPE_LABEL.Etc;

    return (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className={`text-white ${type.color} p-2`}>{filterIdols}</span>
        </div>
    );
}

export default CalendarTileContent;
