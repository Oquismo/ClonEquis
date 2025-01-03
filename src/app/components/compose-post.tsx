// import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// import { revalidatePath } from "next/cache";
export function ComposePost ({
    
    userAvatarUrl
}: {
    
    userAvatarUrl: string;
}){
    return(
        <form className=" flex flex-1 flex-col gap-y-4">
              <img className="rounded-full w-12 h-12 object-contain" src={userAvatarUrl} />
            <div className="flex flex-1 flex-col gap-y-4">

            <textarea
            name='post'
            rows={4}
            className="w-full textt-2xl bg-black placeholder-gray-500"
            placeholder="Que dices primo"
            ></textarea>
            <button className="bg-sky-300 font-bold rounded-full px-5 py-2 self-end"
            >Publicar tuit
            </button>
            </div>
        </form>
    )

}