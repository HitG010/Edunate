export default function Benefit({ title, description, num, reverse = false }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: reverse ? "row-reverse" : "row",
        justifyContent: "space-between",
        borderBottom: num === "04" ? "none" : "5px solid rgba(34, 0, 0, 0.2)",
      }}
      className="pt-20 pb-20 p-5 h-[30%]"
    >
      <div className="number">
        <h1 className="text-7xl font-bold">{num}</h1>
      </div>
      <div
        className="content flex flex-col"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: reverse ? "flex-end" : "flex-start",
          marginLeft: reverse ? "0" : "30px",
          marginRight: reverse ? "30px" : "0",
        }}
      >
        <h1 className="font-bold text-4xl mb-3">{title}</h1>
        {description}
      </div>
    </div>
  );
}
