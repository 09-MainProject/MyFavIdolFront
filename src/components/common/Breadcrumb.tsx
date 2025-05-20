import { Link, useLocation } from 'react-router';
import useIdolData from '@/hooks/useIdolData';

function Breadcrumb() {
  const { idolList } = useIdolData();
  const location = useLocation();
  const pathLabelMap: Record<string, string> = {
    artists: 'Artist',
    schedule: 'Schedule',
    create: 'Create',
    edit: 'Edit',
    timeline: 'TimeLine',
    profile: 'Profile',
    login: 'Login',
    signup: 'SignUp'
  };
  const paths = location.pathname.split('/').filter(Boolean);
  return (
    <div className="mt-10 ml-5 text-gray-500">
      {location.pathname === '/' ? null : (
        <div>
          <Link to="/">Home</Link>
          {
            paths.map((segment, idx) => {
              const isLast = idx === paths.length - 1;
              const matchedIdol = idolList?.find((idol)=> String(idol.id) === segment);
              const label = matchedIdol?.name ?? pathLabelMap[segment] ?? segment;
              const path = `/${paths.slice(0, idx + 1).join('/')}`;
              
              return (
                <Link to={path} key={path}>
                  <span className='mx-3'>{ '>'}</span>
                  <span className={isLast ? 'font-bold' : undefined}>{label}</span>
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
