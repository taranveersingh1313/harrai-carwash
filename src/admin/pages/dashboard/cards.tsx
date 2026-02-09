
export default function DashboardCards() {
  //  console.log("here");
  const stats = [
    { label: "Total Users", value: 128 },
    { label: "Total Orders", value: 86 },
    { label: "Revenue", value: "₹45,230" },
    { label: "Pending Requests", value: 7 },
  ];

  return (
    <div className="dashboard-cards">
      {stats.map((item, index) => (
        <div className="dashboard-card" key={index}>
          <p className="card-label">{item.label}</p>
          <h3 className="card-value">{item.value}</h3>
        </div>
      ))}
    </div>
  );
}
