
import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

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

        const supabase = createServerActionClient ({cookies})

        const { data: {user} } = await supabase.auth.getUser()

        if (user === null) return

        await supabase.from('posts').insert({content, user_id: user.id})
           
        

    }
    return(
        <form action={addPost} className=" flex flex-1 flex-col gap-y-4">
              <img className="rounded-full w-12 h-12 object-contain" src={userAvatarUrl} />
            <div className="flex flex-1 flex-col gap-y-4">

            <textarea
            name='content'
            rows={4}
            className="w-full textt-2xl bg-black placeholder-gray-500"
            placeholder="Que dices primo"
            ></textarea>
            <button type="submit" className="bg-sky-300 font-bold rounded-full px-5 py-2 self-end"
            >Publicar tuit
            </button>
            </div>
        </form>
    )

}