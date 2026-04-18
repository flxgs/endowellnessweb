# Shadcn UI Standards

This repo uses a strict `shadcn + Tailwind` UI policy.

## Core Rules

1. Build UI with `shadcn` primitives from `@/components/ui/*`.
2. Prefer Tailwind utility classes in TSX over custom CSS selectors.
3. Do not add CSS Modules or page-specific global selectors unless explicitly requested.
4. Keep `app/globals.css` for:
   - Tailwind/shadcn imports
   - design tokens (CSS variables)
   - minimal global base styles
5. If a needed primitive does not exist, add it with:
   - `npx shadcn@latest add <component>`

## Preferred Composition

- Page shell: `Card`, `CardHeader`, `CardContent`, `Separator`
- Actions: `Button` (and `buttonVariants` for link/button parity)
- Labels/status: `Badge`
- Expandable content: `Accordion`
- Shared class composition: `cn()` from `@/lib/utils`

## Styling Guidelines

- Use semantic variants (`default`, `outline`, `secondary`, etc.) before custom overrides.
- Keep one-off utility classes local to the component where they are used.
- Favor responsive utility classes (`sm:`, `md:`, `lg:`, `xl:`) over media-query CSS.
- Keep typography and color consistent with tokens already defined in `app/globals.css`.

## Exceptions

Exceptions are allowed only when required by:

- third-party integration constraints
- performance/accessibility constraints
- explicit product/design request

When making an exception, document the reason in the change summary.
