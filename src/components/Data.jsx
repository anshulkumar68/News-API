import React, { useEffect, useState } from "react";

const Data = () => {
  const [fetchData, setFetchData] = useState([]);
  const [topic, setTopic] = useState("tesla");
  const handleData = async () => {
    if (!topic) return;   // Prevent fetching if topic is empty

    try {
      let response = await fetch(
        `https://newsapi.org/v2/everything?q=${topic}&from=2024-09-10&sortBy=publishedAt&apiKey=30a3086f89bc407b8d5e3256932f8bbd`
      );

      // Check if the response is not ok (status code is not 200)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let info = await response.json();
      setFetchData(info.articles);
    } catch (err) {
      // Handle errors and update state
      console.error(err);
    }
  };

  const handleInput = (e) => {
    setTopic(e.target.value);
  };

  useEffect(() => {
    // Fetch data whenever the topic changes
      handleData();
  }, [topic]);

  return (
    <>
      <div className="navbar-container">
        <input
          className="search-input"
          onChange={handleInput}
          value={topic}
          type="text"
          placeholder="Search Topic"
        />
        <button className="get-data-btn" onClick={handleData}>
          Get Data
        </button>
      </div>

      <div className="card-container">
        {fetchData.length > 0 ? (
          fetchData.map((article, index) => (
            <div className="card-container-inner" key={article.id}>
              <div className="image-container">
                <img
                  src={article.urlToImage}
                  alt="random image"
                  style={{ width: "300px", height: "275px" }}
                />
              </div>
              <div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <p>
                  <strong>Source:</strong>
                  {article.source.name}
                </p>
                <a href={article.url} target="blank" rel="noreference">
                  Read More
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </>
  );
};

export default Data;
