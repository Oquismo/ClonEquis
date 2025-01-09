import { deletePost } from '../../actions/delete-post-action'
import { useState } from 'react'

interface PostProps {
    postId: string
    content: string
    userAvatarUrl: string
    onDelete: (postId: string) => void
}

export function Post({ postId, content, userAvatarUrl, onDelete }: PostProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deletePost(postId)
            onDelete(postId)
        } catch (error) {
            console.error('Error al eliminar el post:', error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className='post'>
            <img className='rounded-full w-10 h-10 object-contain mr-4' src={userAvatarUrl} alt='User Avatar' />
            <p>{content}</p>
            <button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </button>
        </div>
    )
}