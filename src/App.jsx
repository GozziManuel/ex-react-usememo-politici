import { useEffect, useMemo, useState, memo } from "react";

import "./css/App.css";
const PoliticianCard = memo(({ name, image, position, biography }) => {
  console.log(name);

  return (
    <div className="overCard">
      <div className="card">
        <h1>{name}</h1>
        <img
          src={image}
          alt={name}
          onError={({ currentTarget }) => {
            currentTarget.src = "/undefined.png";
          }}
          className="cardImg"
        />
        <h2>{position}</h2>
        <h5>{biography}</h5>
      </div>
    </div>
  );
});
function App() {
  const [politicians, setPoliticians] = useState([]);
  const [inputTrace, setInputTrace] = useState({
    name: "",
    bio: "",
  });
  // GETTING DATA
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

  // TRACE INPUTS
  const handleTranceInput = (e) => {
    const { name, value } = e.target;
    setInputTrace({ ...inputTrace, [name]: value });
  };

  const filterArray = useMemo(() => {
    return politicians.filter((p, i) => {
      const FormatBio = p.biography.toLowerCase().trim();
      const FormatInputBio = inputTrace.bio.toLowerCase().trim();

      const bioFilter = FormatBio.includes(FormatInputBio);

      const FormatName = p.name.toLowerCase().trim();
      const FormatInput = inputTrace.name.toLowerCase().trim();

      const nameFilter = FormatName.includes(FormatInput);
      return nameFilter && bioFilter;
    });
  }, [politicians, inputTrace]);

  return (
    <div className="Container">
      <h1>Politicians</h1>
      <div className="inputContainer">
        <p>Search By name:</p>
        <input
          type="text"
          name="name"
          id=""
          value={inputTrace.name}
          onChange={handleTranceInput}
        />
        <p>Search inside Bio:</p>
        <input
          type="text"
          name="bio"
          id=""
          value={inputTrace.bio}
          onChange={handleTranceInput}
        />
      </div>
      <div className="cardContaniner">
        {filterArray.map((p, i) => {
          return (
            <PoliticianCard key={i} {...p} />
            // <div key={i} className="overCard">
            //   <div className="card">
            //     <h1>{p.name}</h1>
            //     <img
            //       src={p.image}
            //       alt={p.name}
            //       onError={({ currentTarget }) => {
            //         currentTarget.src = "/undefined.png";
            //       }}
            //       className="cardImg"
            //     />
            //     <h2>{p.position}</h2>
            //     <h5>{p.biography}</h5>
            //   </div>
            // </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
