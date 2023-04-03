import React from "react";

const KanapCard = ({ kanap }) => {
  return (
    <a href={"/id=" + kanap._id}>
      <article>
        <img
          src={kanap.imageUrl}
          alt="Lorem ipsum dolor sit amet, Kanap name1"
        />
        <h3 className="productName">{kanap.name}</h3>
        <p className="productDescription">{kanap.description}</p>
      </article>
    </a>
  );
};

export default KanapCard;
