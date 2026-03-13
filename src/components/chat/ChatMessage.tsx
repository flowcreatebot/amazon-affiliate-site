import type { Message } from './types';
import SourceCard from './SourceCard';

interface Props {
  message: Message;
  isStreaming?: boolean;
}

function renderMarkdown(text: string) {
  // Simple inline markdown: bold, links, line breaks
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  // Line breaks (double newline = paragraph break)
  html = html.replace(/\n\n/g, '</p><p>');
  // Single newlines
  html = html.replace(/\n/g, '<br/>');
  // Bullet lists (lines starting with - )
  html = html.replace(/((?:^|<br\/>)- .+(?:<br\/>- .+)*)/g, (match) => {
    const items = match
      .split(/<br\/>/)
      .filter(line => line.startsWith('- '))
      .map(line => `<li>${line.slice(2)}</li>`)
      .join('');
    return `<ul>${items}</ul>`;
  });

  return `<p>${html}</p>`;
}

export default function ChatMessage({ message, isStreaming }: Props) {
  const isUser = message.role === 'user';

  return (
    <div class={`cgl-chat-msg ${isUser ? 'cgl-chat-msg--user' : 'cgl-chat-msg--assistant'}`}>
      <div class="cgl-chat-msg-bubble">
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }} />
        )}
        {isStreaming && !isUser && <span class="cgl-chat-cursor" />}
      </div>
      {!isUser && message.sources && !isStreaming && (
        <SourceCard sources={message.sources} />
      )}
    </div>
  );
}
