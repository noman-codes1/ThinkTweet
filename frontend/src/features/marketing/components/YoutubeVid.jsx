import React from 'react'

const YoutubeVid = ({id}) => {
  return (
    <div className='w-[90%] max-w-3xl aspect-video mx-auto'>
      <iframe className='w-full h-full'
        src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default YoutubeVid