import { useParams, Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import styles from "./Post.module.scss"

type PostData = { id: number; title: string; body: string; userId: number }
type User = { id: number; name: string; email: string; phone: string; website: string }
type Comment = { id: number; name: string; email: string; body: string }

const fetchPost = async (id: string): Promise<PostData> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    if (!response.ok) throw new Error('Nie znaleziono postu')
    return response.json()
}

const fetchUser = async (userId: number): Promise<User> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    return response.json()
}

const fetchComments = async (postId: string): Promise<Comment[]> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    return response.json()
}

export default function Post() {
    const { id } = useParams<{ id: string }>()

    const {
        data: post,
        isLoading: postLoading,
        error: postError,
        isError: postIsError
    } = useQuery<PostData>({
        queryKey: ['post', id],
        queryFn: () => fetchPost(id!),
        enabled: !!id,
    })

    const {
        data: user,
        isLoading: userLoading
    } = useQuery<User>({
        queryKey: ['user', post?.userId],
        queryFn: () => fetchUser(post!.userId),
        enabled: !!post?.userId,
    })

    const {
        data: comments = [],
        isLoading: commentsLoading
    } = useQuery<Comment[]>({
        queryKey: ['comments', id],
        queryFn: () => fetchComments(id!),
        enabled: !!id,
    })

    const isLoading = postLoading || (post?.userId ? userLoading : false) || commentsLoading

    if (isLoading) {
        return <div className={styles.loading}>Ładowanie danych...</div>
    }

    if (postIsError || !post) {
        return <div className={styles.error}>{postError?.message || 'Nie znaleziono postu'}</div>
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
                        <div><span>Imię:</span> {user.name}</div>
                        <div><span>Email:</span> {user.email}</div>
                        <div><span>Telefon:</span> {user.phone}</div>
                        <div><span>Strona:</span> {user.website}</div>
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