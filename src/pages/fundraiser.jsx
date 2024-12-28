export default function ({ data }) {
  const { fundraiser } = data;
  return (
    <div>
      <h1>{fundraiser.title}</h1>
      <p>{fundraiser.description}</p>
    </div>
  );
}
