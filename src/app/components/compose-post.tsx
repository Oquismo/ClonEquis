// 'use client'

// import { ComposePostButton } from './compose-post-button'
// import { addPost } from '../../actions/add-post-action'
// import { useRef } from 'react'


// export function ComposePost ({
//   userAvatarUrl
// }: {
//   userAvatarUrl: string
// }) {
//   const formRef = useRef<HTMLFormElement>(null)

//   return (
//     <form ref={formRef} action={async (formData) => {
//       await addPost(formData)
//       formRef.current?.reset()
//     }} className='flex flex-row p-3 border-b border-white/20'>
//       <img className='rounded-full w-10 h-10 object-contain mr-4' src={userAvatarUrl} />
//       <div className='flex flex-1 flex-col gap-y-4'>
//       <textarea
//         name='content'
//         rows={4}
//         className='w-full text-xl bg-black placeholder-gray-500 p-2'
//         placeholder='¡¿Qué está pasando!?'
//       ></textarea>
//         <ComposePostButton />
//       </div>
//     </form>
//   )
// }

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// import { revalidatePath } from "next/cache";
export function ComposePost ({
    
    userAvatarUrl
}: {
    
    userAvatarUrl: string;
}){
    const addPost = async (formData: FormData) => {
        'use server'

        const content = formData.get('content')

        if (content === null) return

        const supabase = createServerActionClient({ cookies })

        const { data: { user } } = await supabase.auth.getUser()
        if (user === null) return
        await supabase.from ('posts').insert({content, user_id: user.id})

        console.log('hola puta')
    }
    return(
        <form action={addPost} className=" flex flex-1 flex-col gap-y-4">
              <img className="rounded-full w-6 h-6 object-contain" src={userAvatarUrl} />
            <div className="flex flex-1 flex-col gap-y-4">

            <textarea
            name='content'
            rows={4}
            className="w-full textt-2xl bg-black placeholder-gray-500"
            placeholder="Que dices primo"
            ></textarea>
            <button className="bg-sky-300 font-bold rounded-full px-5 py-2 self-end"
            >Publicar
            </button>
            </div>
        </form>
    )

}

