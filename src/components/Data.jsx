import React, { useEffect, useRef, useState } from "react";
import { DataStyle } from "../style/DataStyle";
import { Wrapper } from "../style/wrapper";

export const Data = () => {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();

  const fetchData = async (query, pageNumber) => {
    try {
      const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${query}&client_id=uuQkkq4bui9YIraeKN6lcbjW8zdrd-aj9kTfon-7Jt8&per_page=12`;
      const response = await fetch(url);
      const data = await response.json();
      const results = data.results;
      setResult((prevResults) => [...prevResults, ...results]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchData(query, page);
  }, [query, page]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Wrapper>
      <div className="top">
        {" "}
        <h1>search anything</h1>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for..."
          ref={nameRef}
        />
      </div>
      <DataStyle>
        {result.map((e) => (
          <div key={e.id}>
            <div>{e.likes}</div>
            <img src={e.urls.small} alt="" />
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </DataStyle>
    </Wrapper>
  );
};
