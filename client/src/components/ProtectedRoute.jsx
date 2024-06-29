import { Navigate, Outlet} from 'react-router-dom';
import { PublicRoutes } from '../navigation/routes';

const ProtectedRoute = () => {
    let token = sessionStorage.getItem('token');
    if (token === null){
        return <Navigate to={PublicRoutes.LOGIN}/>
    }
    return <Outlet />;
}

export default ProtectedRoute;