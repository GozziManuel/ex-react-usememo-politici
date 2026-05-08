import { useEffect, useState } from "react";

import "./css/App.css";

function App() {
  const [politicians, setPoliticians] = useState([]);
  const handleAsyncFunction = async (url) => {
    const result = await fetch(url);
    const obj = await result.json();
    return obj;
  };
  const fetchApi = async () => {
    const arrayPoliticians = await handleAsyncFunction(
      `http://localhost:3333/politicians`,
    );
    return arrayPoliticians;
  };
  useEffect(() => {
    const viewingResult = async () => {
      const resultApi = await fetchApi();
      console.log(resultApi);
      setPoliticians(resultApi);
    };
    viewingResult();
  }, []);

  return (
    <div className="Container">
      <h1>Politicians</h1>
      <div className="cardContaniner">
        {politicians.map((p, i) => {
          return (
            <div key={i} className="overCard">
              <div className="card">
                <h1>{p.name}</h1>
                <img
                  src={p.image}
                  alt={p.name}
                  onError={({ currentTarget }) => {
                    currentTarget.src = "/undefined.png";
                  }}
                  className="cardImg"
                />
                <h2>{p.position}</h2>
                <h5>{p.biography}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
