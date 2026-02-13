// only for search input, not used in create or edit forms
// export const SearchInput = ({ value, onChange, placeholder = "Search..." }: any) => {
//   return (
//     <div className="search-wrapper">
//       <input
//         type="text"
//         className="form-control"
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
//       />
//     </div>
//   );
// };


// Enhanced SearchInput with clear button and better styling
export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
}: any) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div
      className="search-wrapper"
      style={{ position: "relative", display: "inline-block" }}
    >
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "8px 32px 8px 8px", // extra space for button
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          style={{
            position: "absolute",
            right: "6px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            color: "#999",
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};
