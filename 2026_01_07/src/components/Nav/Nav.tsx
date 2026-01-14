import styles from './Nav.module.scss'

export default function Nav() {
    return <nav className={styles.Nav}>
        <a href={"/"}>Strona główna</a>
        <a href={"/wpis"}>Wpisy</a>
        <a href={"/kategoria"}>Kategorie</a>
    </nav>
}