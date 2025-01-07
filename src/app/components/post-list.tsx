import PostCard from "./post-card"

// Define el tipo 'post' si no está definido en otro lugar
type User = {
  user_name: string;
  name: string;
  avatar_url: string;
};

type Post = {
  id: string;
  user: User;
  content: string;
  created_at: string; // Añadir el campo de fecha de publicación
};

export function PostList ({ posts }: { posts: Post[] }) {
    return (
        <>
        {
          posts?.map(post => {
            const {
              id,
              user,
              content,
              created_at, // Obtener la fecha de publicación
            } = post;
            const {
              user_name: userName,
              name: userFullName,
              avatar_url: avatarUrl,
            } = user;
            return (
              <PostCard 
                content={content}
                key={id} 
                userName={userName} 
                userFullName={userFullName} 
                avatarUrl={avatarUrl}
                createdAt={created_at} // Pasar la fecha de publicación a PostCard
              />
            );
          })
        }
        </>
    );
}