import styles from './Nav.module.scss'
import {NavLink} from 'react-router'

export default function Nav() {
    return <nav className={styles.Nav}>
        <NavLink to="/">Strona główna</NavLink>
        <NavLink to="/posts">Wpisy</NavLink>
        <NavLink to="/kategoria">Kategorie</NavLink>
    </nav>
}