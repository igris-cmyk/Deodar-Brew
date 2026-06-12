import type { ReactNode } from "react";

type AnimatedSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export default function AnimatedSection({
  id,
  className = "",
  children,
}: AnimatedSectionProps) {
  return (
    <section id={id} className={`motion-fade-up ${className}`}>
      {children}
    </section>
  );
}
