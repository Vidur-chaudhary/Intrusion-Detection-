import React, { useState, useEffect } from "react";
import "./DatasetTable.css";

const DatasetTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchData(page);
  }, [page, searchQuery, sortBy, sortOrder]);

  const fetchData = async (pageNumber) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pageNumber,
        limit,
        search: searchQuery,
        sort_by: sortBy,
        sort_order: sortOrder
      });

      const response = await fetch(`http://127.0.0.1:5000/api/data?${queryParams}`);
      const jsonData = await response.json();
      
      if (jsonData.data) {
        setData(jsonData.data);
        setTotalPages(jsonData.total_pages);
      } else {
        console.error("Error: Data is missing in API response", jsonData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const handleExport = async () => {
    try {
      const queryParams = new URLSearchParams({ search: searchQuery });
      const response = await fetch(`http://127.0.0.1:5000/api/export?${queryParams}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "exported_data.csv";
      a.click();
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return (
    <div className="dataset-container">
      <h2>Dataset (Page {page})</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by IP, Attack Type, or Date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button onClick={handleExport}>Export to CSV</button>

        <label>Sort By:</label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          {data.length > 0 && Object.keys(data[0]).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>

        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          Sort: {sortOrder.toUpperCase()}
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table border="1">
            <thead>
              <tr>
                {data.length > 0 && Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => <td key={i}>{value}</td>)}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>⬅ Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(page - 3, 0), Math.min(page + 2, totalPages))
              .map((num) => (
                <button key={num} className={page === num ? "active" : ""} onClick={() => handlePageChange(num)}>
                  {num}
                </button>
              ))}
            <button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>Next ➡</button>
            <span> of {totalPages} Pages</span>
          </div>
        </>
      )}
    </div>
  );
};

export default DatasetTable;
