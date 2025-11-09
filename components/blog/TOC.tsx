import { PortableTextBlock } from 'sanity';

export default function TOC({ body }: { body: PortableTextBlock[] }) {
  // Placeholder: In production, parse headings from body and generate anchor links
  return (
    <nav className="mb-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded">
      <span className="font-semibold text-neutral-700 dark:text-neutral-200">Table of Contents</span>
      {/* TODO: Generate TOC dynamically from body */}
      <ul className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
        <li>(TOC auto-generation coming soon)</li>
      </ul>
    </nav>
  );
}
