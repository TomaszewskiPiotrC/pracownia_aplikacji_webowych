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
    const [newComment, setNewComment] = useState({ name: '', email: '', body: '' })

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                setLoading(true)

                const postResponse = await fetch(
                    `http://localhost:5000/api/posts/${id}`
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
                    `http://localhost:5000/api/comments/post/${id}`
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

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newComment, postId: Number(id) })
            })
            if (response.ok) {
                const addedComment = await response.json()
                setComments(prev => [...prev, addedComment])
                setNewComment({ name: '', email: '', body: '' })
            }
        } catch (err) {
            console.error('Błąd dodawania komentarza:', err)
        }
    }

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

                <form onSubmit={handleAddComment} style={{ marginBottom: '30px', background: '#1a1a1a', padding: '20px', borderRadius: '8px' }}>
                    <input
                        type="text"
                        placeholder="Twoje imię"
                        value={newComment.name}
                        onChange={e => setNewComment({...newComment, name: e.target.value})}
                        required
                        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '8px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newComment.email}
                        onChange={e => setNewComment({...newComment, email: e.target.value})}
                        required
                        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '8px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}
                    />
                    <textarea
                        placeholder="Treść komentarza"
                        value={newComment.body}
                        onChange={e => setNewComment({...newComment, body: e.target.value})}
                        required
                        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '8px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', minHeight: '80px' }}
                    />
                    <button type="submit" style={{ background: '#555', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Dodaj komentarz
                    </button>
                </form>

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