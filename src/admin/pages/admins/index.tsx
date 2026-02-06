// import { useEffect, useState } from "react";

// interface Admin {
//   id: number;
//   name: string;
//   email: string;
//   phone_number: number;
//   created_at: string;
// }

// export default function AdminList() {
//   const [admins, setAdmins] = useState<Admin[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   const fetchAdmins = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/admin/admin-list", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       const data = await res.json();
//       setAdmins(data.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading admins...</p>;

//   return (
//     <div className="admin-dashboard">
//       <h1 className="page-title">Admin Listing</h1>

//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone NO.</th>
//             <th>Created At</th>
//           </tr>
//         </thead>

//         <tbody>
//           {admins.map((admin, index) => (
//             <tr key={admin.id}>
//               <td>{index + 1}</td>
//               <td>{admin.name}</td>
//               <td>{admin.email}</td>
//               <td>{admin.phone_number}</td>
//               <td>{new Date(admin.created_at).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface Admin {
  id: number;
  name: string;
  email: string;
  phone_number: number;
  created_at: string;
}

export default function AdminList() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const res = await fetch("http://localhost:5000/api/admin/admin-list", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    setAdmins(data.data);
    setLoading(false);
  };

  if (loading) return <p>Loading admins...</p>;

  return (
    <div className="admin-dashboard">
      <div className="page-header-row">
        <h1 className="page-title">Admin Listing</h1>

        <button
          className="btn-primary"
          onClick={() => navigate("/admin/create-admin")}
        >
          + Create Admin
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.id}>
              <td>{index + 1}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.phone_number}</td>
              <td>
                {new Date(admin.created_at).toLocaleDateString("en-GB")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
