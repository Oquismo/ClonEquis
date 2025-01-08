import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AuthButtonServer } from "@/app/components/auth-button-server";
import { redirect } from "next/navigation";
import { PostList } from "./components/post-list";
import { ComposePost } from "./components/compose-post";


export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    redirect("/login");
  }

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, user:users(name, avatar_url, user_name)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return <div>Error al cargar los posts</div>
  }

  return (


    <main className="flex min-h-screen flex-col items-center justify-between">
    <section className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen">
      <ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url} />
      <PostList posts={posts ?? []} />
    </section>
    <AuthButtonServer />
  </main>






    // <main className="flex min-h-screen flex-col items-center justify-between ">
    //   <section className="max-w-[600px] mx-auto border-l border-r border-white/30 h-full min-h-screen">
        
    //     <ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url} />
    //     <PostList posts={posts ?? []} />
    //     <AuthButtonServer />
    //   </section>
      
    //   <main className="mt-4 items-center justify-between">
    //   </main>
    // </main>
  );
}
