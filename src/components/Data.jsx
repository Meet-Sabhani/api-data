import React, { useEffect, useRef, useState } from "react";
import { DataStyle } from "../style/DataStyle";
import { Wrapper } from "../style/wrapper";

export const Data = () => {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=uuQkkq4bui9YIraeKN6lcbjW8zdrd-aj9kTfon-7Jt8&per_page=10`;
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

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
        fetchData(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, page, query]);

  return (
    <Wrapper>
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
      <DataStyle>
        {result.map(({ id, likes, urls }) => (
          <div key={id}>
            <div>{likes}</div>
            <img src={urls.small} alt="" />
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </DataStyle>
    </Wrapper>
  );
};
