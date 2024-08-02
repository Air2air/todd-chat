import * as React from 'react'
import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconShare } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'
import exampleData from '@/data/questions.json'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

const exampleMessages = exampleData.map(example => ({
  ...example,
  message: `${example.heading} ${example.subheading}`
}))

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  return (
    <div>
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {exampleMessages.map((example, index) => (
            <div
              key={example.heading}
              className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                index > 1 && 'hidden md:block'
              }`}
              onClick={async () => {
                setMessages(currentMessages => [
                  ...currentMessages,
                  {
                    id: nanoid(),
                    display: <UserMessage>{example.message}</UserMessage>
                  }
                ])

                const responseMessage = await submitUserMessage(
                  example.message
                )

                setMessages(currentMessages => [
                  ...currentMessages,
                  responseMessage
                ])
              }}
            >
              <div className="text-sm font-semibold">{example.heading}</div>
              <div className="text-sm text-zinc-600">
                {example.subheading}
              </div>
            </div>
          ))}
        </div>

        {messages?.length >= 2 ? (
          <div className="flex h-12 items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-2" />
                    Share
                  </Button>
                  <ChatShareDialog
                    chatId={id}
                    title={title}
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}