export default function HeadingSmall({ title, description }) {
  return (
    <header>
      <h3 className="heading-small__title">{title}</h3>
      {description && <p className="heading-small__description">{description}</p>}
    </header>
  );
}
