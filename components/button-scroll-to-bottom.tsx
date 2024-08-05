'use client'

import * as React from 'react'

import { cn } from '@/utils/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconArrowDown } from '@/components/ui/icons'

interface ButtonScrollToBottomProps extends ButtonProps {
  isAtBottom: boolean
  scrollToBottom: () => void
}

export const ButtonScrollToBottom: React.FC<ButtonScrollToBottomProps> = ({
  className,
  isAtBottom,
  scrollToBottom,
  ...props
}) => {
  const buttonStyles = cn(
    'absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2',
    isAtBottom ? 'opacity-0' : 'opacity-100',
    className
  )

  return (
    <Button variant="outline" size="icon" className={buttonStyles} onClick={scrollToBottom} {...props}>
      <IconArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  )
}
