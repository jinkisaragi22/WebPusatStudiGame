import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader } from "@googlemaps/js-api-loader";
import bg from "../assets/bg-about.png";

export default function About() {
  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    loader
      .importLibrary("maps")
      .then(({ Map }) => {
        const mapOptions = {
          mapId: "fc4c5a53866b08c2",
          center: { lat: -7.291051708947406, lng: 112.75859509549994 },
          zoom: 18,
        };
        const map = new Map(document.getElementById("map"), mapOptions);

        loader
          .importLibrary("marker")
          .then(({ AdvancedMarkerElement }) => {
            const marker = new AdvancedMarkerElement({
              map: map,
              position: { lat: -7.291361659579262, lng: 112.75874395808756 },
              title: "Your Location",
            });
          })
          .catch((e) => {
            console.error("Error loading marker library:", e);
          });
      })
      .catch((e) => {
        console.error("Error loading Google Maps:", e);
      });
  }, []);

  return (
    <div
      className="flex flex-col w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Navbar />
      <div className="flex flex-col items-center md:items-start md:container md:mx-auto mt-10 px-4 md:px-4 md: py-2 text-gray-100 rounded-lg">
        <h1 className="text-5xl font-extrabold text-center md:text-left mb-4">
          About Us
        </h1>
        <p className="text-lg mt-4 text-justify md:w-3/4 leading-relaxed transition duration-500 ease-in-out transform hover:scale-105">
          The Game and Multimedia Research Center is a specialized hub for the
          exploration and development of cutting-edge games and multimedia. Our
          focus lies in the intersection of technology, creativity, and
          interactive media, offering an innovative platform for research,
          development, and education. The center nurtures talent in game design,
          development, and multimedia production, fostering a deep understanding
          of industry trends and technologies. We place a strong emphasis on the
          integration of artificial intelligence (AI) in game development,
          enabling the creation of dynamic, responsive, and personalized gaming
          experiences. Our games adapt to player behavior, create immersive
          environments, and offer enhanced interactivity. Through our programs,
          the Game and Multimedia Research Center empowers students and
          professionals to lead in the ever-growing digital entertainment and
          multimedia sectors, pushing the boundaries of AI-driven game design.
        </p>

        <h1 className="text-5xl font-extrabold text-center md:text-left mt-10 mb-4">
          Find Us Here
        </h1>
        <div
          id="map"
          className="w-full h-64 md:w-96 md:h-64 mt-4 border-4 border-gray-400 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:scale-105"
        ></div>
        <div className="mt-4 text-center md:text-left">
          <p className="font-semibold text-lg">
            Jl. Ngagel Jaya Tengah No.73-77, Baratajaya, Kec. Gubeng, Surabaya,
            Jawa Timur 60284
          </p>
          <p className="font-semibold text-lg">Gedung U, Ruangan U206</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
