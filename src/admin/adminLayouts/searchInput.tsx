
export const SearchInput = ({ value, onChange, placeholder = "Search..." }: any) => {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
      />
    </div>
  );
};