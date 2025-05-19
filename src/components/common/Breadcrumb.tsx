import { Link, useLocation } from 'react-router';

function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);
  return (
    <div className="mt-10 ml-5 text-gray-500">
      {location.pathname === '/' ? null : (
        <div>
          <Link to="/">Home</Link>
          {paths.map((segment, idx) => (
            // schedule로 예를 들면 slice 메서드를 사용하여 0번째 인덱스 즉 schedule이 되고 idx+1는 아이돌 아이디를 가리킴
            <Link to={`/${paths.slice(0, idx + 1).join('/')}`}>
              <span key={location.key}>
                {' '}
                {'>'} {segment}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
export default Breadcrumb;
