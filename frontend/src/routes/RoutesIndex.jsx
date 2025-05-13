import {Routes, Route} from 'react-router-dom';
import { useAuthContext } from '@/hooks/useAuthContext';
import SignUp from '@/pages/auth/SignUp';
import Home from '@/pages/home/Home';
import Login from '@/pages/auth/Login';
import Reminder from '@/pages/reminder/Reminder';
import MyEvents from '@/pages/reminder/MyEvents';
import Profile from '@/pages/profile/Profile';

const RoutesIndex = () => {
    const {isAuth} = useAuthContext(); // Consumir el contexto de autenticación
    return (
        <Routes>
            <Route path='/' element= {<Home/>}/>
            <Route path='/SignUp' element= {<SignUp/>}/>
            <Route path='/Login' element = {<Login/>}/>
            <Route path='/calendario' element = 
                {
                    isAuth 
                    ? <Reminder/> 
                    : <Login/>
                }
            />
            <Route path = '/eventos' element= 
                {
                        isAuth
                        ? <MyEvents/>
                        : <Login/>
                }   
            />
            <Route path = '/perfil' element= 
                {
                    isAuth
                    ? <Profile/>
                    :<Login/>
                }
            />
        </Routes>  
    );
}

export default RoutesIndex;