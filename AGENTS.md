<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:ui-shadcn-rules -->
# UI Must Use shadcn

For any UI work in this repository:

- Use `shadcn` components from `@/components/ui/*` as the default building blocks.
- Prefer adding missing primitives via the `shadcn` CLI instead of custom handcrafted components.
- Do not add custom selector-based CSS for page/component styling.
- Keep `app/globals.css` limited to theme tokens, Tailwind/shadcn imports, and minimal global base styles.
- Build layout and visual styling with Tailwind utility classes directly in components.

Before implementing UI changes, read:

- `docs/shadcn-ui-standards.md`
- `skills/shadcn-ui/SKILL.md`

If a request requires breaking these rules, explain why in the PR/patch notes and keep the exception minimal.
<!-- END:ui-shadcn-rules -->
