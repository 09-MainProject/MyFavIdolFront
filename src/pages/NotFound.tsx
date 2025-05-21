import React from 'react';
import {Link} from 'react-router-dom';

function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <h2 className="mt-4 text-2xl font-semibold text-gray-600">페이지를 찾을 수 없습니다</h2>
                <p className="mt-2 text-gray-500">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
                <Link
                    to="/"
                    className="mt-8 inline-block rounded bg-black px-6 py-3 text-white transition hover:bg-gray-800"
                >
                    홈으로 돌아가기
                </Link>
            </div>
        </div>
    );
}

export default NotFound; 