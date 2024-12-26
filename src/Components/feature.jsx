export default function Feature({ title, description, icon }) {
  return (
    <div className="flex flex-col w-[25%] p-5 pt-10">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        {icon}
      </div>
      <p className="text-md mt-2">{description}</p>
    </div>
  );
}
