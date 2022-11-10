import React, { useState, useEffect } from "react";


const Recipe = () => {
  const [query, setQuery] = useState("Biryani");

  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.edamam.com/api/recipes/v2?q=${query}&app_id=6d6a060a&app_key=
      f03884d9754a67c7c4f780b761379af0&type=public`
    )
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data.hits);
        const arrayData = data.hits;
        setData(arrayData);
      });
  },[query,isClicked]);

  return (
    <div>
      <div className="header">
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Find the best recipe.."
        ></input>
        <button
          onClick={() => {
            setIsClicked((prevState) => !prevState);
          }}
        >
          Search
        </button>
      </div>
      <div className="display">
        {data.map((item, i) => {
          return (
            <div key={i} className="display-cards">
              <img src={item.recipe.image} className="images" alt="food" /> <br />
              <h4>{item.recipe.label}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recipe;
