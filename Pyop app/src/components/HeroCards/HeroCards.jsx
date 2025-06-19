import React from "react";
import "./HeroCards.css";

const HeroCards = ({ data }) => {
  const { Title, Desc, array } = data || {};
  return (
    <div>
      <div class="hero-card">
        <div class="hero-card__border"></div>
        <div class="hero-card_title__container">
          <span class="hero-card_title">{Title}</span>
          <p class="hero-card_paragraph">{Desc}</p>
        </div>
        <hr class="line" />
        <ul class="hero-card__list">
          {array.map((item, index) => {
            return (
              <li class="hero-card__list_item">
                <span class="check">
                  <svg
                    class="check_svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span class="list_text">{item}</span>
              </li>
            );
          })}
        </ul>
        {/* <button class="button">Create</button> */}
      </div>
    </div>
  );
};

export default HeroCards;
