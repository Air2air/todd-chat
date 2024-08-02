import { Separator } from '@/components/ui/separator'
import { UIState } from '@/lib/chat/actions'
import { Session } from '@/lib/types'

export interface ChatListProps {
  messages: UIState
  session?: Session
  isShared: boolean
}

export function ChatList({ messages, session, isShared }: ChatListProps) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        message && message.display !== undefined ? (
          <div key={message.id}>
            {message.display}
            {index < messages.length - 1 && <Separator className="my-4" />}
          </div>
        ) : null
      ))}
    </div>
  )
}