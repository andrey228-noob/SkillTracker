export default function Heading({ title, description }) {
  return (
    <div className="heading">
      <h2 className="heading__title">{title}</h2>
      {description && <p className="heading__description">{description}</p>}
    </div>
  );
}
