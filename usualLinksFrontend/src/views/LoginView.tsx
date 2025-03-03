import {Link} from 'react-router-dom';

export default function LoginView() {
    return (
        <>
            <div className="font-black">LoginView</div>
            <nav>
                <Link to='/auth/register'>  {/*<Link/> ES MUCHO MEJOR QUE <a/> PARA NAVEGAR ENTRE URL´s */}
                    No tienes cuenta, ¡registrate!
                </Link>
            </nav>
        </>
    )
}