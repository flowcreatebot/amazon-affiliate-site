import { useRef, useEffect } from 'preact/hooks';
import type { Message } from './types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { SITE } from '../../data/site';

interface Props {
  messages: Message[];
  isStreaming: boolean;
  onSend: (text: string) => void;
  onClose: () => void;
}

const SUGGESTIONS = [
  'Best espresso machine under $200?',
  'How do I clean a burr grinder?',
  'Pour over vs French press?',
  'Best grinder for espresso?',
];

export default function ChatPanel({ messages, isStreaming, onSend, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  const isEmpty = messages.length === 0;

  return (
    <div class="cgl-chat-panel">
      <div class="cgl-chat-header">
        <div class="cgl-chat-header-left">
          <div class="cgl-chat-header-dot" />
          <span class="cgl-chat-header-title">{SITE.name}</span>
        </div>
        <button class="cgl-chat-close" onClick={onClose} aria-label="Close chat">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="cgl-chat-messages" ref={scrollRef}>
        {isEmpty && (
          <div class="cgl-chat-welcome">
            <div class="cgl-chat-welcome-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 28C8 28 6 28 6 26C6 24 8 18 16 18C24 18 26 24 26 26C26 28 24 28 24 28H8Z" fill="currentColor" opacity="0.2"/>
                <path d="M16 4C12 4 8 7 8 12C8 14 9 16 10 17L8 22L13 20C14 20.5 15 21 16 21C20 21 24 18 24 12C24 7 20 4 16 4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="cgl-chat-welcome-text">Ask me anything about coffee gear</p>
            <p class="cgl-chat-welcome-sub">I can help you find the right equipment based on our reviews and guides.</p>
            <div class="cgl-chat-suggestions">
              {SUGGESTIONS.map(q => (
                <button
                  key={q}
                  class="cgl-chat-suggestion"
                  onClick={() => onSend(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isStreaming={isStreaming && i === messages.length - 1 && msg.role === 'assistant'}
          />
        ))}

        {isStreaming && messages[messages.length - 1]?.role === 'user' && (
          <div class="cgl-chat-msg cgl-chat-msg--assistant">
            <div class="cgl-chat-msg-bubble cgl-chat-typing">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      <ChatInput onSend={onSend} disabled={isStreaming} />
    </div>
  );
}
