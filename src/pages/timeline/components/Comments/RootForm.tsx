import React from 'react';
import CommentEditor from './CommentEditor';

type Props = {
    rootInput: string;
    setRootInput: (value: string) => void;
    handleAddRootComment: () => void;
};

function RootForm({rootInput, setRootInput, handleAddRootComment}: Props) {
    return (
        <li className="mb-6">
            <CommentEditor
                value={rootInput}
                onChange={setRootInput}
                onSubmit={handleAddRootComment}
            />
        </li>
    );
}

export default RootForm;