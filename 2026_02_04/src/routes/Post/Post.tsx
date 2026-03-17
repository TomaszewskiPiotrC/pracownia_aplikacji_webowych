import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import styles from "./Post.module.scss"

type PostData = {
    id: number
    title: string
    body: string
    userId: number
}

type User = {
    id: number
    name: string
    email: string
    phone: string
    website: string
}

type Comment = {
    id: number
    name: string
    email: string
    body: string
}

export default function Post() {
    const { id } = useParams<{ id: string }>()
    const [post, setPost] = useState<PostData | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                setLoading(true)

                const postResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${id}`
                )
                if (!postResponse.ok) throw new Error('Nie znaleziono postu')
                const postData = await postResponse.json()
                setPost(postData)

                const userResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${postData.userId}`
                )
                const userData = await userResponse.json()
                setUser(userData)

                const commentsResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
                )
                const commentsData = await commentsResponse.json()
                setComments(commentsData)

                setError(null)
            } catch (err) {
                setError('Wystąpił błąd podczas ładowania danych')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchPostData()
        }
    }, [id])

    if (loading) {
        return <div className={styles.loading}>Ładowanie danych...</div>
    }

    if (error || !post) {
        return <div className={styles.error}>{error || 'Nie znaleziono postu'}</div>
    }

    return (
        <div className={styles.Post}>
            <Link to="/posts" className={styles.backButton}>
                ← Powrót do listy wpisów
            </Link>

            <div className={styles.postContainer}>
                <div className={styles.postId}>Post #{post.id}</div>
                <h2>{post.title}</h2>
                <p className={styles.postBody}>{post.body}</p>
            </div>

            {user && (
                <div className={styles.authorInfo}>
                    <h3>Autor wpisu</h3>
                    <div className={styles.authorDetails}>
                        <div>
                            <span>Imię:</span> {user.name}
                        </div>
                        <div>
                            <span>Email:</span> {user.email}
                        </div>
                        <div>
                            <span>Telefon:</span> {user.phone}
                        </div>
                        <div>
                            <span>Strona:</span> {user.website}
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.commentsSection}>
                <h3>Komentarze ({comments.length})</h3>
                <div className={styles.commentsList}>
                    {comments.map((comment) => (
                        <div key={comment.id} className={styles.commentCard}>
                            <div className={styles.commentHeader}>
                                <div className={styles.commentAuthor}>{comment.name}</div>
                                <div className={styles.commentEmail}>{comment.email}</div>
                            </div>
                            <p className={styles.commentBody}>{comment.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}