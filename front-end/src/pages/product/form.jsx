import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userIsLoggedIn } from '../../services/auth';

const FormProduct = ({ setCurrentRoute }) => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        userIsLoggedIn(navigate, null)
        setCurrentRoute(location.pathname);
    }, [])
    return <h1>Form Product</h1>
}

export default FormProduct;