import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const ProfileEdit = () => {
  return (
    <div>
      <Header />
      <div className="py-5">
        <h1 className="text-center text-white py-5">Profile Edit</h1>
        <h2 className="text-center text-white py-5">
          Em construção <Loading />
        </h2>
        <h4 className="text-center text-white py-5">
          Vá para -{">"}{" "}
          <Link
            to="/character"
            className="text-white construction-character-link"
          >
            Personagens
          </Link>{" "}
          {"<"}-
        </h4>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileEdit;
