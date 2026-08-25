import React from 'react'
import placeholder from "../../../assets/placeholder.jpeg"
// please write the address in a clean way. #tip : use vite alias

const VideoHowItWorks = () => {

  // NOTE
  // 1. For now it's quite fine, but it's not a security
  // 2. Your url is public that means, anybody else can use the video
  // 3. Although it's not a sensitive video, but it's good to implement security

  //public url where video is hosted
  const url =
    "https://guhp7smx8g33rcvs.public.blob.vercel-storage.com/ThinkTweetVideo%20-%20Final-mDi6n6jUbTSjqcvQl6uXKvjXSOicFB.mp4";

  return (
    <div className="w-[90%] max-w-3xl aspect-video mx-auto rounded-lg pointer-events-none">
      <video
        className="rounded-lg shadow-xl"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        poster={placeholder}
        src={url}
      ></video>
    </div>
  );
}

export default VideoHowItWorks;