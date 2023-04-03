import React from "react";

const KanapCard = ({ kanap }) => {
  return (
    <section id="items" className="items">
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
    </section>
  );
};

export default KanapCard;
