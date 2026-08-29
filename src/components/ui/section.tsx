import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Set for dark surfaces so nested focus rings switch to the light variant. */
  dark?: boolean;
  children: React.ReactNode;
};

export function Section({
  id,
  className,
  containerClassName,
  dark,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-20 sm:py-24 lg:py-32",
        dark && "on-dark",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
