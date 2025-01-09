export async function deletePost(postId: string): Promise<void> {
    // Aquí deberías implementar la lógica para eliminar el post, por ejemplo, haciendo una petición a tu API
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Error al eliminar el post');
    }
}