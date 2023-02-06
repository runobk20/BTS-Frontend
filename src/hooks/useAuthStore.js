import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanErrorMsg, onChecking, onLogin, onLogout } from '../store';
import backendApi from '../api/backendApi';


export function useAuthStore() {
    const dispatch = useDispatch();
    const { isLogged, user, errorMsg } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const path = localStorage.getItem('lastPath') || '/';

    async function startLogin({email, password}) {
        dispatch(onChecking());

        try {
            
            const {data} = await backendApi.post('/auth/login', {email, password});
            const {token, ok, ...payload} = data;
            localStorage.setItem('token', token);
            dispatch(onLogin(payload));
            navigate(path, {
                replace: true
            });

        } catch (error) {
            const errMsg = error.response.data.msg || 'Something went wrong!';
            dispatch(onLogout(errMsg));
            setTimeout(() => {
                dispatch(cleanErrorMsg());
            }, 200)
        }
    }

    async function startRegister({email, name, password, role}) {
        dispatch(onChecking());

        try {
            const {data} = await backendApi.post('/auth/new', {email, name, password, role});
            const {token, ...payload} = data;
            localStorage.setItem('token', token);
            dispatch(onLogin(payload));

        } catch (error) {
            const errMsg = error.response.data?.msg || 'Something went wrong';
            dispatch(onLogout(errMsg));
            setTimeout(() => {
                dispatch(cleanErrorMsg());
            }, 100)
        }
    }

    function startLogout() {
        localStorage.removeItem('token');
        dispatch(onLogout(null));
    }

    async function checkAuthToken() {
        const token = localStorage.getItem('token');

        if(!token) return dispatch(onLogout(null));

        try {
            
            const {data} = await backendApi.get('/auth/renew');
            const {token, ok, ...payload} = data;
            localStorage.setItem('token', token);
            dispatch(onLogin(payload));

        } catch (error) {
            const errMsg = error?.response.data?.msg || 'Something went wrong';
            localStorage.removeItem('token');
            dispatch(onLogout(errMsg));
            setTimeout(() => {
                dispatch(cleanErrorMsg());
            }, 100)
        }
    }

    return {
        //Props
        errorMsg,
        isLogged,
        user,

        //Methods
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,

    }
}
