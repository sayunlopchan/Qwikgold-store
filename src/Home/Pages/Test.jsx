import React, { useEffect, useState } from "react";
import axios from "axios";

function Test() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
      headers: {
        "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY, // Changed from REACT_APP_ to VITE_
      },
    };

    axios
      .request(options)
      .then((response) => {
        setGames(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          "Something went wrong! " +
            (err.response?.data?.message || err.message)
        );
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Free Games List</h1>
      {games.slice(0, 10).map((game) => (
        <div
          key={game.id}
          style={{
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>{game.title}</h3>
          {game.thumbnail && (
            <img
              src={game.thumbnail}
              alt={game.title}
              style={{ width: "200px", height: "auto", borderRadius: "4px" }}
            />
          )}
          <p>
            <strong>Description:</strong> {game.short_description}
          </p>
          <p>
            <strong>Genre:</strong> {game.genre}
          </p>
          <p>
            <strong>Platform:</strong> {game.platform}
          </p>
          <p>
            <strong>Publisher:</strong> {game.publisher}
          </p>
          <p>
            <strong>Developer:</strong> {game.developer}
          </p>
          <p>
            <strong>Release Date:</strong> {game.release_date}
          </p>
          {game.game_url && (
            <a
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              Play Game
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default Test;
