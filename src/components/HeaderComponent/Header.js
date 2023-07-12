import { IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import styles from './Header.module.scss'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';
import { Logout } from '../../redux/userRedux';
import localStorage from 'redux-persist/es/storage';
function Header() {
    const quantity = useSelector(state => state.cart.quantity);
    const username = useSelector(state => state.user.currentUser);
    const navigate = useNavigate()
    const handleLogout = () =>{
        localStorage.removeItem('persist:root')
        Logout()
        navigate('/login')
        window.location.reload();
    }
    return ( 
        <div className={styles.header_container}>
            <div className={styles.header_left}>
                <span className={styles.language}>EN</span>
                <div className={styles.Search}>
                    <input placeholder='Find something...'/>
                    <SearchIcon/>
                </div>
            </div>
            <div className={styles.header_center}>CAMILE.</div>
            <div className={styles.header_right}>
                <p>Stores</p>
                {username ? <p className={styles.login} onClick={handleLogout}>Logout</p> : 
                <Link style={{textDecoration:'none', color:'black'}}  to='/login'><p className={styles.login} >Sign In</p></Link>}
                <IconButton aria-label="cart">
                    <Badge badgeContent={quantity} color="secondary">
                        <Link to='/cart'><ShoppingCartOutlinedIcon /></Link>
                    </Badge>
                </IconButton>
            </div>
        </div>
    );
}

export default Header;