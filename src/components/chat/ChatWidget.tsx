import { useState, useCallback, useEffect } from 'preact/hooks';
import type { Message, Source } from './types';
import ChatPanel from './ChatPanel';
import './chat.css';

interface Props {
  apiUrl: string;
}

let msgId = 0;
function nextId() {
  return `msg-${++msgId}`;
}

export default function ChatWidget({ apiUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('cgl-chat-teaser-dismissed')) return;
    const timer = setTimeout(() => setShowTeaser(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismissTeaser = useCallback(() => {
    setShowTeaser(false);
    sessionStorage.setItem('cgl-chat-teaser-dismissed', '1');
  }, []);

  const handleSend = useCallback(async (text: string) => {
    const userMsg: Message = { id: nextId(), role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsStreaming(true);

    const assistantId = nextId();

    try {
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Something went wrong.' }));
        setMessages(prev => [...prev, {
          id: assistantId,
          role: 'assistant',
          content: err.error || 'Something went wrong. Please try again.',
        }]);
        setIsStreaming(false);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let content = '';
      let sources: Source[] = [];
      let assistantAdded = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const json = line.slice(6);
          try {
            const event = JSON.parse(json);

            if (event.type === 'sources') {
              sources = event.sources;
            } else if (event.type === 'token') {
              content += event.content;
              if (!assistantAdded) {
                assistantAdded = true;
                setMessages(prev => [...prev, {
                  id: assistantId, role: 'assistant', content, sources,
                }]);
              } else {
                setMessages(prev =>
                  prev.map(m => m.id === assistantId ? { ...m, content, sources } : m)
                );
              }
            } else if (event.type === 'error') {
              content = event.message || 'Something went wrong.';
              setMessages(prev => {
                if (assistantAdded) {
                  return prev.map(m => m.id === assistantId ? { ...m, content } : m);
                }
                return [...prev, { id: assistantId, role: 'assistant', content }];
              });
            }
          } catch { /* skip malformed events */ }
        }
      }

      // If no tokens came through, show error
      if (!assistantAdded) {
        setMessages(prev => [...prev, {
          id: assistantId,
          role: 'assistant',
          content: 'Sorry, I couldn\'t generate a response. Please try again.',
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        id: nextId(),
        role: 'assistant',
        content: 'Unable to connect. Please check your connection and try again.',
      }]);
    }

    setIsStreaming(false);
  }, [messages, apiUrl]);

  return (
    <>
      {open && (
        <ChatPanel
          messages={messages}
          isStreaming={isStreaming}
          onSend={handleSend}
          onClose={() => setOpen(false)}
        />
      )}
      {showTeaser && !open && (
        <div class="cgl-chat-teaser">
          <span class="cgl-chat-teaser-text">👋 Ask us anything about coffee!</span>
          <button
            class="cgl-chat-teaser-close"
            onClick={(e) => { e.stopPropagation(); dismissTeaser(); }}
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      )}
      <button
        class={`cgl-chat-trigger ${open ? 'cgl-chat-trigger--open' : ''}`}
        onClick={() => { setOpen(!open); if (!open) dismissTeaser(); }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 11.5C21 16.75 16.97 21 12 21C10.67 21 9.4 20.71 8.25 20.2L3 21L4.3 16.8C3.49 15.38 3 13.73 3 11.5C3 6.25 7.03 2 12 2C16.97 2 21 6.25 21 11.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="8.5" cy="11.5" r="1" fill="currentColor"/>
            <circle cx="12" cy="11.5" r="1" fill="currentColor"/>
            <circle cx="15.5" cy="11.5" r="1" fill="currentColor"/>
          </svg>
        )}
      </button>
    </>
  );
}
