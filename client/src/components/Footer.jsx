import React from "react";
import logo from "../assets/logo-istts.png";
import { Link } from "react-router-dom";
import email from "../assets/email-outline-01.png";
import elang from "../assets/elang-ai.png";

export default function Footer() {
  return (
    <footer className="bg-[#202020] text-white border-gray-200 font-sans w-full py-5 mt-28">
      <div className="container mx-auto w-full px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-2">
          <div className="flex flex-col mb-4 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <img src={logo} alt="Logo" className="w-12 h-12" />
              <img src={elang} alt="Elang" className="w-14 h-14" />
              <h1 className="text-xl font-semibold">
                Game and Multimedia Research Center
              </h1>
            </div>
            <p className="text-sm font-semibold">Contact Us</p>
            <a
              href="mailto:pusatstudigame@istts.ac.id"
              target="_blank"
              className="text-md flex items-center text-center gap-1"
            >
              <img src={email} alt="" className="w-5" />
              <p className="text-sm ">pusatstudigame@istts.ac.id</p>
            </a>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <h1 className="text-2xl font-bold mb-2 md:mb-0">Visit Us</h1>
            <Link
              className="font-semibold mb-1"
              to="https://www.istts.ac.id"
              target="_blank"
            >
              ISTTS
            </Link>
            <Link
              className="font-semibold mb-1"
              to="https://career.istts.ac.id"
              target="_blank"
            >
              ISTTS Career Center
            </Link>
            <Link
              className="font-semibold"
              to="https://pmb.istts.ac.id/manajemen/index.php"
              target="_blank"
            >
              PMB ISTTS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
