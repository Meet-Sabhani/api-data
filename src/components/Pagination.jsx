import React, { useEffect, useRef, useState } from "react";
import { DataStyle } from "../style/DataStyle";
import { Wrapper } from "../style/wrapper";

export const Pagination = () => {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();

  const fetchData = async (searchPage = 1) => {
    try {
      const url = `https://api.unsplash.com/search/photos?page=${searchPage}&query=${query}&client_id=uuQkkq4bui9YIraeKN6lcbjW8zdrd-aj9kTfon-7Jt8&per_page=10`;
      const response = await fetch(url);
      const { results } = await response.json();
      setResult((prevResults) => [...prevResults, ...results]);
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
    fetchData();
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    setResult([]);
    fetchData(pageNumber);
  };

  return (
    <Wrapper>
      <div className="top">
        <h1>Search anything</h1>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for..."
          ref={nameRef}
        />
        <button onClick={handleSearchAndFetch}>Search</button>
      </div>
      <div className="pagination">
        {[...Array(10)].map((_, index) => (
          <span key={index + 1} onClick={() => handlePageClick(index + 1)}>
            {index + 1}
          </span>
        ))}
      </div>
      <DataStyle>
        {result.map(({ id, likes, urls }) => (
          <div key={id}>
            <div>{likes}</div>
            <img src={urls.small} alt="" />
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </DataStyle>
      <div className="pagination">
        {[...Array(10)].map((_, index) => (
          <span key={index + 1} onClick={() => handlePageClick(index + 1)}>
            {index + 1}
          </span>
        ))}
      </div>
    </Wrapper>
  );
};
