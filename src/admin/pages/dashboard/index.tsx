import "../../assets/css/dashboard.css";
import DashboardCards from "./cards";

export default function Dashboard() {
  return (
    <div className="admin-dashboard">
      <h1 className="page-title">Admin Dashboard</h1>

      {/* Stat cards */}
      <DashboardCards />

      {/* Recent activity */}
      <div className="dashboard-section">
        <h2>Recent Activity</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Created Order</td>
              <td>2026-02-01</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Admin</td>
              <td>Updated Settings</td>
              <td>2026-02-01</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Sarah</td>
              <td>Deleted User</td>
              <td>2026-01-31</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
