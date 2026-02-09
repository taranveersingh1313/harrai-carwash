
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiEdit, FiTrash2 } from "react-icons/fi";




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
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   const fetchAdmins = async () => {
//     const res = await fetch("http://localhost:5000/api/admin/admin-list", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     const data = await res.json();
//     setAdmins(data.data);
//     setLoading(false);
//   };

//   if (loading) return <p>Loading admins...</p>;

//   return (
//     <div className="admin-dashboard">
//       <div className="page-header-row">
//         <h1 className="page-title">Admin Listing</h1>

//         <button
//           className="btn-primary"
//           onClick={() => navigate("/admin/create-admin")}
//         >
//           + Create Admin
//         </button>
//       </div>

//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Created</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {admins.map((admin, index) => (
//             <tr key={admin.id}>
//               <td>{index + 1}</td>
//               <td>{admin.name}</td>
//               <td>{admin.email}</td>
//               <td>{admin.phone_number}</td>
//               <td>
//                 {new Date(admin.created_at).toLocaleDateString("en-GB")}
//               </td>
//               <td style={{ display: "flex", gap: "10px" }}>
//                 <FiEdit
//                   size={18}
//                   style={{ cursor: "pointer" }}
//                   title="Edit"
//                   onClick={() => navigate(`/admin/edit-admin/${admin?.id}`)}
//                 />
//                 <FiTrash2
//                   size={18}
//                   style={{ cursor: "pointer", color: "red" }}
//                   title="Delete"
//                   onClick={() => console.log("delete")}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

interface Admin {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  created_at: string;
}

export default function AdminList() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins(page, limit);
  }, [page, limit]);

  /* ---------------- FETCH ADMINS ---------------- */
  const fetchAdmins = async (pageNumber: number, limitNumber: number) => {
    setLoading(true);

    const res = await fetch(
      `http://localhost:5000/api/admin/admin-list?page=${pageNumber}&limit=${limitNumber}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.json();

    setAdmins(data.data || []);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  /* ---------------- DELETE ADMIN ---------------- */
  const deleteAdmin = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Admin?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/delete-admin/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error();

      Swal.fire("Deleted!", "Admin deleted successfully", "success");
      fetchAdmins(page, limit);
    } catch {
      Swal.fire("Error", "Failed to delete admin", "error");
    }
  };

  if (loading) return <p>Loading admins...</p>;

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="page-header-row" style={{ display: "flex", justifyContent: "" }}>
        <h1 className="page-title">Admin Listing</h1>

        <div style={{  gap: "1px",    marginLeft: "800px" }}>
          {/* console.log(e.target.value); */}

          <select
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
            className="form-control"
          >

            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div>
          <button className="btn-primary" onClick={() => navigate("/admin/create-admin")}>
            + Create Admin
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {admins.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No admins found
              </td>
            </tr>
          )}

          {admins.map((admin, index) => (
            <tr key={admin.id}>
              <td>{(page - 1) * limit + index + 1}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.phone_number}</td>
              <td>{new Date(admin.created_at).toLocaleDateString("en-GB")}</td>
              <td style={{ display: "", gap: "10px" }}>
                <FiEdit
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/admin/edit-admin/${admin.id}`)}
                />
                <FiTrash2
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => deleteAdmin(admin.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      {admins.length > 0 && totalPages > 1 && (
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

