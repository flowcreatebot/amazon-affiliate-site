import { useState, useRef } from 'preact/hooks';

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

const MAX_LENGTH = 500;

export default function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    if (value.length <= MAX_LENGTH) {
      setText(value);
    }
    // Auto-resize
    target.style.height = 'auto';
    target.style.height = Math.min(target.scrollHeight, 120) + 'px';
  }

  const nearLimit = text.length > MAX_LENGTH * 0.85;

  return (
    <div class="cgl-chat-input-wrap">
      <div class="cgl-chat-input-row">
        <textarea
          ref={textareaRef}
          class="cgl-chat-textarea"
          placeholder="Ask about coffee gear..."
          value={text}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          maxLength={MAX_LENGTH}
        />
        <button
          class={`cgl-chat-send ${text.trim() && !disabled ? 'cgl-chat-send--active' : ''}`}
          onClick={handleSubmit}
          disabled={!text.trim() || disabled}
          aria-label="Send message"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9L15 9M15 9L10 4M15 9L10 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      {nearLimit && (
        <span class="cgl-chat-char-count">{text.length}/{MAX_LENGTH}</span>
      )}
    </div>
  );
}
