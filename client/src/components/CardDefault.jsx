import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { ShareIcon } from "@heroicons/react/24/outline";
import ai from "../assets/AI-01.png";
import unityLogo from "../assets/unity.png";
import godotLogo from "../assets/godot.png";
import unrealLogo from "../assets/unreal.png";

export default function CardDefault({ id, title, cover, group, isAI, engine }) {
  const groupWords = group.split(" ");
  const bucket = import.meta.env.VITE_BUCKET_URL;
  const gameUrl = `${window.location.origin}/games/${id}`;

  const formattedEngine =
    engine?.includes("Unreal Engine") ? "Unreal" : engine;

  const engineLogos = {
    Unity: unityLogo,
    Godot: godotLogo,
    Unreal: unrealLogo,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this game: ${title}`,
          url: gameUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(gameUrl);
      alert("Game link copied to clipboard!");
    }
  };

  return (
    <Card className="flex flex-col mt-6 w-full max-w-xs md:max-w-sm lg:max-w-md h-96 group ease-in-out delay-75 duration-300 hover:scale-105">
      <CardHeader
        color="blue-gray"
        className="w-full h-2/4 self-center rounded-t-lg rounded-b-none"
      >
        <img
          src={`${bucket}/covers/${cover}`}
          alt={title}
          className="w-full h-full object-cover rounded-t-lg rounded-b-none"
        />
      </CardHeader>
      <CardBody className="h-3/4 flex flex-col">
        <Typography
          variant="small"
          color="gray"
          className="mb-1 font-semibold text-gray-400 flex flex-col lg:flex-row"
        >
          {groupWords.map((word, index) => (
            <span key={index} className="mr-1">
              {word}
            </span>
          ))}
        </Typography>
        <Typography variant="h5" color="blue-gray" className="">
          {title} {engineLogos[formattedEngine] && (
          <img src={engineLogos[formattedEngine]} alt={engine} className="w-10 h-10" />
        )}
        </Typography>
        {/* {engineLogos[formattedEngine] && (
          <img src={engineLogos[formattedEngine]} alt={engine} className="w-5 h-5" />
        )} */}
        {isAI && (
          <img
            src={ai}
            alt="AI Stamp"
            className="absolute right-1 top-28 w-14 h-14 opacity-90"
          />
        )}
      </CardBody>
      <CardFooter className="pt-0 flex justify-between items-center">
        <Link to={`/games/${id}`}>
          <Button className="w-full">Read More</Button>
        </Link>
        <IconButton onClick={handleShare} variant="text" color="gray">
          <ShareIcon className="h-6 w-6" />
        </IconButton>
      </CardFooter>
    </Card>
  );
}
