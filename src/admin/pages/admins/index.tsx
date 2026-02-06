
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
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins(page);
  }, [page]);

  /* ---------------- FETCH ADMINS ---------------- */
  const fetchAdmins = async (pageNumber: number) => {
    setLoading(true);

    const res = await fetch(
      `http://localhost:5000/api/admin/admin-list?page=${pageNumber}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.json();

    setAdmins(data.data);
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
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
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

    if (res.ok) {
      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Admin has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchAdmins(page); // refresh list
    } else {
      throw new Error();
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete admin",
    });
  }
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
              <td>
                {new Date(admin.created_at).toLocaleDateString("en-GB")}
              </td>
              <td style={{ display: "flex", gap: "10px" }}>
                <FiEdit
                  size={18}
                  style={{ cursor: "pointer" }}
                  title="Edit"
                  onClick={() =>
                    navigate(`/admin/edit-admin/${admin.id}`)
                  }
                />
                <FiTrash2
                  size={18}
                  style={{ cursor: "pointer", color: "red" }}
                  title="Delete"
                  onClick={() => deleteAdmin(admin.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------------- PAGINATION ---------------- */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <button
          className="btn-secondary"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span style={{ padding: "6px 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          className="btn-secondary"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
