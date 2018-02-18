import React from "react";

export default props => {
  const { camper, index, active } = props;

  return (
    <tr key={index}>
      <td className="position">{index}</td>
      <td className="image-and-name">
        <img
          className="image"
          src={camper.img}
          style={{
            width: "44px"
          }}
          alt={camper.username + "'s profile image'"}
        />
        <p className="name">
          <a href={`https://www.freecodecamp.com/${camper.username}`}>
            {camper.username}
          </a>
        </p>
      </td>
      <td
        className={active === "all-time" ? "active total" : "not-active total"}
      >
        {camper.alltime}
      </td>
      <td
        className={
          active === "last-thirty" ? "active recent" : "not-active recent"
        }
      >
        {camper.recent}
      </td>
    </tr>
  );
};
