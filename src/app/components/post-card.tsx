'use client'
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import {useState} from "react";
import Link from "next/link";
import { IconMessageCircle } from '@tabler/icons-react';
import { IconRepeat } from '@tabler/icons-react';
import { IconHeartPlus } from '@tabler/icons-react';
import { deletePost } from '../../actions/delete-post-action'

interface PostCardProps {
    postId: string
    userName: string
    userFullName: string
    avatar_url: string
    content: string
    onDelete: (postId: string) => void
}

export default function PostCard({ postId, userName, userFullName, avatar_url, content, onDelete }: PostCardProps) {
  const [isFollowed, setIsFollowed] = useState(false);
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
    <Card className=" swadow-none bg-transparent hover:bg-slate-800
    transition
    border-b rounded-none cursor-pointer border-white/20">
      <CardHeader className="justify-between">
        <div className="flex gap-2">
            <Link href={`/${userName}`}>
            <Avatar  size="md" src={avatar_url} alt={userName} />
            </Link>

          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{userFullName}</h4>
            <h5 className="text-small tracking-tight text-default-400">@{userName}</h5>
          </div>
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-white">
        <p>{content}</p>
        <span className="pt-2">

        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <button>
      <IconMessageCircle className="w-4 h-4"/>
      </button>
      <button>
      <IconRepeat className="w-4 h-4"/>
      </button>
      <button>
      <IconHeartPlus className="w-4 h-4"/>
      </button>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Eliminando...' : 'Eliminar'}
      </button>
        
      </CardFooter>
    </Card>
  );
}
