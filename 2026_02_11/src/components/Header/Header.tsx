import styles from "./Header.module.scss"
import {useLocation} from "react-router"

export default function Header(){
    const location = useLocation()

    const getPageTitle = () => {
        switch(location.pathname) {
            case '/':
                return 'Strona główna'
            case '/posts':
                return 'Wszystkie wpisy'
            case '/kategoria':
                return 'Kategorie'
            default:
                if (location.pathname.includes('/posts/')) {
                    return 'Szczegóły wpisu'
                }
                return 'Blog'
        }
    }

    return (
        <>
            <header className={styles.Header}>
                <h1>{getPageTitle()}</h1>
            </header>
        </>
    )
}