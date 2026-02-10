export const Pagination = ({ page, totalPages, setPage }: any) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
      <button 
        className="btn-pagination" 
        disabled={page === 1} 
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span className="page-info">
        Page <strong>{page}</strong> of {totalPages}
      </span>

      <button 
        className="btn-pagination" 
        disabled={page === totalPages} 
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};