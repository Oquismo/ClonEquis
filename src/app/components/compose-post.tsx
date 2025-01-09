'use client'

import { useState } from 'react'
import { addPost } from '../../actions/add-post-action'

export function ComposePost ({
    userAvatarUrl,
    onPostCreated
}: {
    userAvatarUrl: string;
    onPostCreated: (newPost: any) => void;
}){
    const [pending, setPending] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setPending(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        const content = formData.get('content')

        if (content === null || content === '') {
            setPending(false)
            setError('El contenido no puede estar vacío')
            return
        }

        try {
            await addPost(formData)
            onPostCreated(formData)
        } catch (err) {
            setError('Error al crear el post')
        } finally {
            setPending(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-y-4">
            {error && <div className="error">{error}</div>}
            <img className="rounded-full w-12 h-12 object-contain" src={userAvatarUrl} />
            <div className="flex flex-1 flex-col gap-y-4">
                <textarea
                    name='content'
                    rows={4}
                    className="w-full text-2xl bg-black placeholder-gray-500"
                    placeholder="Que dices primo"
                ></textarea>
                <button
                    disabled={pending}
                    type='submit'
                    className='bg-sky-500 text-sm disabled:opacity-40 disabled:pointer-events-none font-bold rounded-full px-5 py-2 self-end'
                >
                    {pending ? 'Posteando...' : 'Postear'}
                </button>
            </div>
        </form>
    )
}