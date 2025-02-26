import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import api from "../helper/api";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@material-tailwind/react";
import ai from "../assets/AI-01.png";
import unityLogo from "../assets/unity-white.png";
import godotLogo from "../assets/godot.png";
import unrealLogo from "../assets/unreal-white.png";

export default function Detail() {
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState({});
  const { gameID } = useParams();
  const bucket = import.meta.env.VITE_BUCKET_URL;

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const gameResponse = await api.get(`/games/id/${gameID}`);
        setGame(gameResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameID]);

  

  // Ensure engine name is properly formatted
  const formattedEngine = game.engine?.includes("Unreal Engine") ? "Unreal" : game.engine;

  const engineLogos = {
    Unity: unityLogo,
    Godot: godotLogo,
    Unreal: unrealLogo,
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col w-full h-full">
          <Navbar />
          <div className="bg-cover bg-gradient-to-r from-black to-slate-700 via-black w-full flex md:h-96 items-center py-10">
            <div className="w-full h-3/4 container mx-auto">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="relative w-72 h-auto md:w-auto md:h-96 flex-shrink-0">
                  <img
                    src={`${bucket}/covers/${game.cover}`}
                    alt={game.title}
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
                <div className="flex flex-col text-white gap-4 self-center px-4 py-4 md:px-0 md:py-0">
                  <div className="flex gap-3 items-center">
                    <h1 className="text-5xl font-bold">{game.title}</h1>
                    {game.isAI && <img src={ai} alt="AI Generated" className="w-20 h-20 opacity-90" />}
                    {formattedEngine && engineLogos[formattedEngine] && (
                      <img
                        src={engineLogos[formattedEngine]}
                        alt={formattedEngine}
                        className="w-20 h-20"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-400 text-md">Developed By</p>
                    <p>{game.developer}</p>
                  </div>
                  <div className="flex flex-col pb-16">
                    <p className="text-gray-400 text-md">Supervised By</p>
                    <p>{game.publisher}</p>
                  </div>
                  {game.download_link != "null" && (
                    <Button
                      className="flex self-start bg-white text-black w-fit"
                      onClick={() => (window.location.href = game.download_link)}
                    >
                      Download Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto flex flex-col mt-24 px-4 md:px-0">
            <section className="mb-10">
              <h1 className="text-3xl font-bold mb-4">Screenshots</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {game.assets?.some((asset) => asset.type === "image") ? (
                  game.assets
                    .filter((asset) => asset.type === "image")
                    .map((asset) => (
                      <img
                        key={asset.id}
                        src={`${bucket}/images/${asset.filename}`}
                        alt={`${asset.title} screenshot`}
                        className="w-full h-44 object-cover rounded-3xl"
                      />
                    ))
                ) : (
                  <p className="col-span-full text-center font-bold">No screenshots for this game</p>
                )}
              </div>
            </section>
            <section className="mb-10">
              <h1 className="text-3xl font-bold mb-4">Game Overview</h1>
              <div className="w-full text-justify">
                <p className="text-lg">{game.game_detail}</p>
              </div>
            </section>
            <div className="border-b-2 mb-10"></div>
            <section className="mb-10">
              <h1 className="text-3xl font-bold mb-4">Trailer</h1>
              <div className="flex flex-col items-center gap-10">
                {game.assets?.some((asset) => asset.type === "video") ? (
                  game.assets
                    .filter((asset) => asset.type === "video")
                    .map((asset) => (
                      <video key={asset.id} className="w-full md:w-1/2 rounded-lg" controls>
                        <source src={`${bucket}/videos/${asset.filename}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ))
                ) : (
                  <p className="font-bold">No trailer for this game</p>
                )}
              </div>
            </section>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
