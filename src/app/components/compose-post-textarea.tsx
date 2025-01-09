'use client'

import { experimental_useFormStatus as useFormStatus } from "react-dom"
import { useRef, useEffect, use } from "react"

export function ComposePostTextarea(){
    const {pending} = useFormStatus()
    const alreadySent = useRef(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {

        if (textareaRef.current === null) return

        if (!pending && alreadySent.current ){

            alreadySent.current = false
            textareaRef.current.value = ''
            return


        }

            alreadySent.current = pending


    }, [pending])



return(

    <textarea
    ref={textareaRef}
    name="content"
    rows={4}
    className="w-full text-2xl bg-black placeholder-gray-500"
    placeholder="Que dices primo"
    ></textarea>
)
}