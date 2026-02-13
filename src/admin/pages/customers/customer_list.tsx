import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { SearchInput } from "../../adminLayouts/searchInput"; // Import Search
import { Pagination } from "../../adminLayouts/Pagination"; // Import Pagination
import { BASE_URL } from "../../config/apiConfig";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone_no: string;
  created_at: string;
}

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // NEW: Search state

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // Re-fetch when page, limit, OR search changes
  useEffect(() => {
    fetchCustomers();
  }, [page, limit, search]);

  /* ---------------- FETCH CUSTOMERS ---------------- */
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      // Added &search= parameter to the API call
      const res = await fetch(
        `${BASE_URL}/admin/customer-list?page=${page}&limit=${limit}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      setCustomers(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE CUSTOMER ---------------- */
  const deleteCustomer = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Customer?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${BASE_URL}/admin/delete-customer/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error();
      Swal.fire("Deleted!", "Customer deleted successfully", "success");
      fetchCustomers();
    } catch (error) {
      Swal.fire("Error", "Failed to delete customer", "error");
    }
  };

  return (
    <div className="admin-dashboard">
      {/* HEADER ROW */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 className="page-title">Customer Listing</h1>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {/* REUSABLE SEARCH */}
          <SearchInput 
            value={search} 
            onChange={(val: string) => {
              setSearch(val);
              setPage(1); // Reset to page 1 on new search
            }} 
            placeholder="Search customers..." 
          />

          {/* LIMIT SELECTOR */}
          <select
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
            className="form-control"
            style={{ width: "80px" }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          <button className="btn-primary" onClick={() => navigate("/admin/create-customer")}>
            + Create Customer
          </button>
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Loading admins...</p>
      ) : (
        <>
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
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>No customers found</td>
                </tr>
              ) : (
                customers.map((customer, index) => (
                  <tr key={customer.id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone_no}</td>
                    <td>{new Date(customer.created_at).toLocaleDateString("en-GB")}</td>
                    <td>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <FiEdit style={{ cursor: "pointer" }} onClick={() => navigate(`/admin/edit-customer/${customer.id}`)} />
                        <FiTrash2 style={{ cursor: "pointer", color: "red" }} onClick={() => deleteCustomer(customer.id)} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* REUSABLE PAGINATION */}
          <Pagination 
            page={page} 
            totalPages={totalPages} 
            setPage={setPage} 
          />
        </>
      )}
    </div>
  );
}