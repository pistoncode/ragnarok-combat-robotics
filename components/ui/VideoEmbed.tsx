import React from 'react';

export interface VideoEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({
  videoId,
  title = 'YouTube video',
  className = ''
}) => {
  return (
    <div className={`relative w-full pb-[56.25%] overflow-hidden rounded-lg border border-[var(--border)] ${className}`}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
