import React, { useEffect, useState } from "react";
import axios from "axios";
import KanapCard from "./KanapCard";

const KanapSection = () => {
  const [kanaps, setKanaps] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/products",
    }).then((res) => setKanaps(res.data));
  });

  return (
    <main className="limitedWidthBlockContainer">
      <div className="limitedWidthBlock">
        <div className="titles">
          <h1>Nos produits</h1>
          <h2>Une gamme d'articles exclusifs</h2>
        </div>
        <section className="items" id="items">
          {kanaps.map((kanap) => {
            return <KanapCard key={kanap._id} kanap={kanap} />;
          })}
        </section>
      </div>
    </main>
  );
};

export default KanapSection;
