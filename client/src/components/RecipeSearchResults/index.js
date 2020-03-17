import React from "react";
import "./style.css";

function RecipeSearchResults(props) {
  // const {id, title, readyInMinutes, image, imageUrls: [url]} = props.results;
  console.log(props.results)
  return (
    <ul className="list-group search-results">
      {/* {props.results.map(result => (
        <li key={result} className="list-group-item">
          <img alt="Recipe" src={image} className="img-fluid" />
          <span>{title}</span>
          <span>readyInMinutes</span>
        </li>
      ))} */}
    </ul>
  );
}
// 1:{5 items
//   "id":227961
//   "title":"Cajun Spiced Black Bean and Sweet Potato Burgers"
//   "readyInMinutes":20
//   "image":"Cajun-Spiced-Black-Bean-and-Sweet-Potato-Burgers-227961.jpg"
//   "imageUrls":[1 item
//   0:"Cajun-Spiced-Black-Bean-and-Sweet-Potato-Burgers-227961.jpg"
//   ]
//   }
export default RecipeSearchResults;
