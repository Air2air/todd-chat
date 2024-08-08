import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/utils/utils'

import { Button, buttonVariants } from '@/components/ui/button'
import { IconGitHub, IconVercel } from '@/components/ui/icons'

interface HeaderProps {}

export function Header({}: HeaderProps) {
  const buttonClass = cn(buttonVariants({ variant: 'outline' }))
  const deployButtonClass = cn(buttonVariants())

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center" />
      <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://github.com/vercel/nextjs-ai-chatbot/"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          <IconGitHub />
          <span className="hidden ml-2 md:flex">GitHub</span>
        </a>
        <a
          href="https://vercel.com/templates/Next.js/nextjs-ai-chatbot"
          target="_blank"
          className={deployButtonClass}
        >
          <IconVercel className="mr-2" />
          <span className="hidden sm:block">Deploy to Vercel</span>
          <span className="sm:hidden">Deploy</span>
        </a>
      </div>
    </header>
  )
}