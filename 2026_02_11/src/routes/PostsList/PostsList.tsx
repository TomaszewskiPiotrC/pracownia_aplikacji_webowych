import { useState } from 'react'
import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import styles from "./PostsList.module.scss"

type Post = {
    id: number
    title: string
    body: string
    userId: number
}

const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!response.ok) {
        throw new Error('Nie udało się pobrać danych')
    }
    return response.json()
}

export default function PostsList() {
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 9

    const { data: posts = [], isLoading, error, isError } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const totalPages = Math.ceil(posts.length / postsPerPage)

    if (isLoading) {
        return <div className={styles.loading}>Ładowanie postów...</div>
    }

    if (isError) {
        return <div className={styles.error}>{error.message}</div>
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