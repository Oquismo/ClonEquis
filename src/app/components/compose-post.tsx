import React, { useState } from 'react';

export function ComposePost ({
    userAvatarUrl
}: {
    userAvatarUrl: string;
}){
    const [message, setMessage] = useState<string | null>(null);

    const addPost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const postContent = formData.get('post');

        try {
            'use server';
            console.log('Post content:', postContent);
            // Aquí puedes agregar la lógica para enviar el post al servidor
            setMessage('Post publicado con éxito');
        } catch (error) {
            console.error('Error al publicar el post:', error);
            setMessage('Error al publicar el post');
        }
    };

    return(
        <form onSubmit={addPost} className="flex flex-1 flex-col gap-y-4">
            <img className="rounded-full w-12 h-12 object-contain" src={userAvatarUrl} />
            <div className="flex flex-1 flex-col gap-y-4">
                <textarea
                    name='post'
                    rows={4}
                    className="w-full text-2xl bg-black placeholder-gray-500"
                    placeholder="Que dices primo"
                ></textarea>
                <button type="submit" className="bg-sky-300 font-bold rounded-full px-5 py-2 self-end">
                    Publicar tuit
                </button>
                {message && <p>{message}</p>}
            </div>
        </form>
    );
}