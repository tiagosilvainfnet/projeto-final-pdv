import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userIsLoggedIn } from '../../services/auth';

const FormCategory = ({ setCurrentRoute }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        userIsLoggedIn(navigate, null)
        setCurrentRoute(location.pathname);
    }, [])

    return <h1>Form category</h1>
}

export default FormCategory;