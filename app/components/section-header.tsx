import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <header className={cn("space-y-2", className)}>
      <p className="text-xs font-semibold tracking-[0.14em] text-primary/80 uppercase">{eyebrow}</p>
      <h2
        className={cn(
          "max-w-[24ch] text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{description}</p> : null}
    </header>
  );
}
