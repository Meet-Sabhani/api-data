import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Pagination } from "antd";
import { Wrapper } from "../style/wrapper";
import { DataStyle } from "../style/DataStyle";
import { AntdStyle } from "../style/AntdStyle";

const AntPagination = () => {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const { pageNumber } = useParams();

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=uuQkkq4bui9YIraeKN6lcbjW8zdrd-aj9kTfon-7Jt8&per_page=15`;
      const response = await fetch(url);
      const { results, total_pages } = await response.json();

      setTotalPages(total_pages);

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
    <>
      <Wrapper>
        <div className="top">
          <h1>antd Pagination</h1>
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
          <AntdStyle>
            <Pagination
              defaultCurrent={1}
              total={totalPages}
              onChange={(pageNumber) => {
                setPage(pageNumber);
                setResult([]);
              }}
            />
          </AntdStyle>
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
    </>
  );
};

export default AntPagination;
