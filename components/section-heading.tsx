import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  index,
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="section-heading">
      <div className="section-kicker">
        <span>{index}</span>
        <span>{label}</span>
      </div>
      <div className="section-title-row">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </Reveal>
  );
}
