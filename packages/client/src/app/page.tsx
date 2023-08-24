import React from "react";
import { Button } from "../components/ui/button";

const Home = () => {
  return (
    <div className="bg-[#14151A] flex h-screen">
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <video autoPlay loop muted className="w-2/3" src="/banner-video.mp4" />
      </div>
      <div className="w-1/2">
        <div className="w-full flex justify-end py-10 pr-10">
          <Button variant="secondary" size="lg">
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
