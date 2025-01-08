'use client'
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IconMessageCircle } from '@tabler/icons-react';
import { IconRepeat } from '@tabler/icons-react';
import { IconHeartPlus } from '@tabler/icons-react';

export function AuthButtonServer() {
  const [requestMade, setRequestMade] = useState(false);

  useEffect(() => {
    if (!requestMade) {
      fetch("https://clon-equis.vercel.app/api/auth", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Auth data:", data);
          setRequestMade(true); // Marca que la solicitud ya se ha realizado
        })
        .catch((error) => {
          console.error("Error fetching auth data:", error);
        });
    }
  }, [requestMade]);

  return (
    <button className="btn btn-primary">
      Iniciar sesión
    </button>
  );
}

export default function PostCard({
  userName,
  avatar_url,
  userFullName,
  content
}: {
  userFullName: string;
  avatar_url: string;
  userName: string;
  content: string;
}) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [requestMade, setRequestMade] = useState(false);

  useEffect(() => {
    if (!requestMade) {
      fetch("https://clon-equis.vercel.app/?_rsc=1iwkq", {
        headers: {
          accept: "*/*",
          "accept-language": "es-ES,es;q=0.9,en;q=0.8",
          "next-router-state-tree": "%5B%22%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2C%22%2F%22%2C%22refresh%22%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
          "next-url": "/",
          priority: "u=1, i",
          rsc: "1",
          "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          cookie: "sb-tybrykzlqxoexynqstph-auth-token=%5B%22eyJhbGciOiJIUzI1NiIsImtpZCI6IlF1QXBpTm84QlVJNzh1MkYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3R5YnJ5a3pscXhvZXh5bnFzdHBoLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJhMzEzYzE0Mi1kNzIzLTRhZGUtYjNiNS02NzNhYmFlOWZlNzMiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzM2MzAwNTg2LCJpYXQiOjE3MzYyOTY5ODYsImVtYWlsIjoicm92ZXR0YTIxNUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImdpdGh1YiIsInByb3ZpZGVycyI6WyJnaXRodWIiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNjEzODM4OTk_dj00IiwiZW1haWwiOiJyb3ZldHRhMjE1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiJTdGVmYW5vIiwiaXNzIjoiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSIsIm5hbWUiOiJTdGVmYW5vIiwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJPcXVpc21vIiwicHJvdmlkZXJfaWQiOiIxNjEzODM4OTkiLCJzdWIiOiIxNjEzODM4OTkiLCJ1c2VyX25hbWUiOiJPcXVpc21vIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3MzYyOTY5ODZ9XSwic2Vzc2lvbl9pZCI6IjNjYmEyZDExLTQxMDgtNDZmNi05ZDIwLTIxYjVmYzEzZWVlNSIsImlzX2Fub255bW91cyI6ZmFsc2V9.gUlMcDhIb2yGfGN9IgtUG1qNDhQQ-5qXEznUgfJzPhs%22%2C%22-1YN46V7BZo5Sp8mGb1dQg%22%2C%22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%22%2Cnull%2Cnull%5D",
          Referer: "https://clon-equis.vercel.app/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: null,
        method: "GET"
      }).then(response => response.json())
        .then(data => {
          console.log('Data fetched:', data);
          setRequestMade(true); // Marca que la solicitud ya se ha realizado
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [requestMade]);

  return (
    <Card className="shadow-none bg-transparent hover:bg-slate-800
    transition
    border-b rounded-none cursor-pointer border-white/20">
      <CardHeader className="justify-between">
        <div className="flex gap-2">
          <Link href={`/${userName}`}>
            <Avatar size="md" src={avatar_url} alt={userName} />
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
        <span className="pt-2"></span>
      </CardBody>
      <CardFooter className="gap-3">
        <button>
          <IconMessageCircle className="w-4 h-4" />
        </button>
        <button>
          <IconRepeat className="w-4 h-4" />
        </button>
        <button>
          <IconHeartPlus className="w-4 h-4" />
        </button>
      </CardFooter>
    </Card>
  );
}
