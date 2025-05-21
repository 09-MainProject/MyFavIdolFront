type Props = {
    title: string;
    idolName: string;
};

function ScheduleHeader({title, idolName}: Props) {
    return (
        <div className="mb-8 border-b border-gray-200 pb-6">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">{title}</h1>
            <div className="flex items-center gap-2 text-gray-600">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    {idolName}
                </span>
            </div>
        </div>
    );
}

export default ScheduleHeader;
