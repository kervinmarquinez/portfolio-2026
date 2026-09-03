import type { ReactNode } from "react";

/** Line-break tags shared by headings translated with `t.rich`. */
export const brTags = {
  br: () => <br />,
  brSm: () => <br className="hidden sm:block" />,
};

/** Inline formatting tags for body copy translated with `t.rich`. */
export const richTags = {
  ...brTags,
  strong: (chunks: ReactNode) => (
    <strong className="font-medium text-ink/80">{chunks}</strong>
  ),
  em: (chunks: ReactNode) => <em>{chunks}</em>,
};
