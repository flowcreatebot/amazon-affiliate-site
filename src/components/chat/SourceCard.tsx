import type { Source } from './types';

interface Props {
  sources: Source[];
}

export default function SourceCard({ sources }: Props) {
  if (!sources || sources.length === 0) return null;

  return (
    <div class="cgl-chat-sources">
      {sources.map(s => (
        <a
          key={s.slug}
          href={`/posts/${s.slug}`}
          class="cgl-chat-source-pill"
          target="_blank"
          rel="noopener"
        >
          <span class="cgl-chat-source-cat">{s.category}</span>
          <span class="cgl-chat-source-title">{s.title}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      ))}
    </div>
  );
}
