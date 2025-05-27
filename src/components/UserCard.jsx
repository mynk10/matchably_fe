import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, description, photoURL } = user;

  return (
    <div className="card bg-base-300 w-85 shadow-sm mt-7">
      <figure>
        <img src={photoURL} alt="userPhoto" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <div>
          {age && gender && <p> {age + " , " + gender}</p>}
          <p> {description}</p>
        </div>
        <div className="card-actions justify-center ">
          <button className="btn btn-secondary">Interested</button>
          <button className="btn btn-primary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
