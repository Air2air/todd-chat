import React, { Suspense } from 'react'
import { MessageType } from '@/lib/types'
import { IconOpenAI } from '@/components/ui/icons'
import { MemoizedReactMarkdown } from '@/utils/markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

interface AssistantMessageProps {
  message: MessageType
}

export const AssistantMessage: React.FC<AssistantMessageProps> = ({ message }) => {
  console.log('Rendering AssistantMessage:', message)
  return (
    <div className="assistant-message group relative mb-4 flex items-start bg-green-100 p-4 rounded">
      <div className="icon-container flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow">
        <IconOpenAI />
      </div>
      <div className="message-content flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        {message.display ? (
          <Suspense fallback={<div>Loading...</div>}>
            {message.display}
          </Suspense>
        ) : (
          <MemoizedReactMarkdown
            className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
            remarkPlugins={[remarkGfm, remarkMath]}
          >
            {message.content || 'No content available'}
          </MemoizedReactMarkdown>
        )}
      </div>
    </div>
  )
}