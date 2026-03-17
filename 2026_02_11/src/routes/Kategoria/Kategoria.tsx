import styles from "./Kategoria.module.scss"

export default function Kategoria() {
    return (
        <nav className={styles.Kategorie}>
            <ul>
                <li>Kategoria1</li>
                <li>Kategoria2</li>
                <li>Kategoria3</li>
                <li>Kategoria4</li>
                <li>Kategoria5</li>
            </ul>
        </nav>
    )
}