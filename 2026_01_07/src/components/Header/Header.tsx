import styles from "./Header.module.scss"
import {useLocation} from "react-router"

export default function Header(){
    const location = useLocation()

    const getPageTitle = () => {
        switch(location.pathname) {
            case '/':
                return 'Strona główna'
            case '/wpis':
                return 'Wpisy'
            case '/kategoria':
                return 'Kategorie'
            default:
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