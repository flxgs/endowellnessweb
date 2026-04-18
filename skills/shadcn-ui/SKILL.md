# Shadcn UI Skill

Use this skill for any request that touches UI, layout, components, visual styling, or interaction states.

## Goal

Ensure all UI is implemented using `shadcn` primitives and Tailwind utility classes.

## Required Defaults

1. Prefer components from `@/components/ui/*`.
2. If a primitive is missing, add it with `npx shadcn@latest add <component>`.
3. Reuse existing variants before creating custom styling patterns.
4. Use `cn()` from `@/lib/utils` for class composition.
5. Keep design tokens in `app/globals.css` and avoid adding custom selector-based CSS.

## What To Avoid

- New handcrafted selector-based global CSS (e.g. `.page-hero`, `.site-header`).
- CSS Modules for normal page/component styling.
- Ad-hoc visual systems that diverge from existing shadcn patterns.

## Implementation Checklist

- Verify whether a suitable primitive already exists in `components/ui`.
- Add missing primitive(s) through shadcn CLI when needed.
- Compose UI with primitives + utility classes.
- Preserve accessibility (focus styles, semantic HTML, button/link correctness).
- Run `npm run lint` and `npm run build` after substantial UI changes.

## Exception Handling

Only break these rules when explicitly requested or technically required. If so, document the reason in your final summary.
