import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import styles from "./PostsList.module.scss"

type Post = {
    id: number
    title: string
    body: string
    userId: number
}

export default function PostsList() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 9

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const response = await fetch('https://jsonplaceholder.typicode.com/posts')
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać danych')
                }
                const data = await response.json()
                setPosts(data)
                setError(null)
            } catch (err) {
                setError('Wystąpił błąd podczas ładowania danych')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const totalPages = Math.ceil(posts.length / postsPerPage)

    if (loading) {
        return <div className={styles.loading}>Ładowanie postów...</div>
    }

    if (error) {
        return <div className={styles.error}>{error}</div>
    }

    return (
        <div className={styles.PostsList}>
            <h2>Wszystkie wpisy ({posts.length})</h2>

            <div className={styles.postsContainer}>
                {currentPosts.map((post) => (
                    <Link to={`/posts/${post.id}`} key={post.id} style={{textDecoration: 'none'}}>
                        <div className={styles.postCard}>
                            <div className={styles.postId}>Post #{post.id}</div>
                            <h3>{post.title}</h3>
                            <p>{post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className={styles.pagination}>
                <button
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    disabled={currentPage === 1}
                >
                    Poprzednia
                </button>
                <span>Strona {currentPage} z {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage === totalPages}
                >
                    Następna
                </button>
            </div>
        </div>
    )
}