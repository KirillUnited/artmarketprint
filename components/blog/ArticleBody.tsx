import { PortableText } from '@portabletext/react';

export default function ArticleBody({ body }: { body: any }) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <PortableText value={body} />
    </div>
  );
}
