import { Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute = () => {
    let token = sessionStorage.getItem('token');
    if (token === null){
        return <Navigate to="/"/>
    }
    return <Outlet />;
}

export default ProtectedRoute;