import { Link, useLocation } from 'react-router';
import useIdolData from '@/hooks/useIdolData';

function Breadcrumb() {
  const { idolList } = useIdolData();
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);
  return (
    <div className="mt-10 ml-5 text-gray-500">
      {location.pathname === '/' ? null : (
        <div>
          <Link to="/">Home</Link>
          {
            paths.map((segment, idx) => {
              const matchedIdol = idolList.find((idol)=> String(idol.id) === segment);
              const label = matchedIdol ? matchedIdol.name : segment;
              const path = `/${paths.slice(0, idx + 1).join('/')}`;
              
              return (
                <Link to={path} key={path}>
                  <span>{'>'} {label}</span>
                </Link>
              );
            })
          }
        </div>
      )}
    </div>
  );
}
export default Breadcrumb;
