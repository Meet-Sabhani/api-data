import React, { useState, useEffect } from "react";
import { DataStyle } from "../style/DataStyle";
import { Wrapper } from "../style/wrapper";
import { Link, useParams } from "react-router-dom";
import { PaginationStyle } from "../style/Pagination";

export const Pagination = () => {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const { pageNumber } = useParams();

  useEffect(() => {
    fetchData();
  }, [page]); // Fetch data when page changes

  const fetchData = async () => {
    try {
      setLoading(true);

      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=uuQkkq4bui9YIraeKN6lcbjW8zdrd-aj9kTfon-7Jt8&per_page=15`;
      const response = await fetch(url);
      const { results, total_pages } = await response.json();

      setTotalPages(total_pages);

      // If it's the first page, set the results directly, otherwise append to existing results
      setResult((prevResults) =>
        page === 1 ? results : [...prevResults, ...results]
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
    setResult([]);
  };

  const handleSearchAndFetch = () => {
    setPage(1);
    fetchData();
  };

  const handlePageClick = () => {
    setPage(pageNumber);
    setResult([]);
  };

  return (
    <Wrapper>
        <h1>Pagination</h1>
      <div className="top">
        <h1>Search anything</h1>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for..."
        />
        <button onClick={handleSearchAndFetch}>Search</button>
      </div>
      {totalPages > 1 && (
        <PaginationStyle>
          {[...Array(totalPages)].map((_, index) => (
            <Link
              to={`/pagination/${index + 1}`}
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </Link>
          ))}
        </PaginationStyle>
      )}
      <DataStyle>
        {result.map((e) => (
          <div key={e.id}>
            <img src={e.urls.small} alt="" />
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </DataStyle>
    </Wrapper>
  );
};
