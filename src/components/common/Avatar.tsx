import React, { useEffect, useState } from 'react';

interface AvatarProps {
  src: string | any;
  alt?: string;
  className?: string;
  clickHandler?: any;
  user?: any;
}
const Avatar = ({ src, alt, className, clickHandler, user }: AvatarProps) => {
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    if (src !== 'NO_IMAGE') {
      const image = new Image();
      image.src = `data:image/png;base64,${src?.buffer}`;
      setRatio(image.width / image.height);
    }
  }, [src]);

  return (
    <div
      className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden relative"
      onClick={clickHandler}
    >
      {src === 'NO_IMAGE' ? (
        <div className="w-full h-full flex justify-center items-center font-bold text-xl text-blue-700">
          {user?.firstName?.slice(0, 1).toUpperCase()}
          {user?.lastName?.slice(0, 1).toUpperCase()}
        </div>
      ) : (
        <img
          className={`${className} absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]
          ${ratio > 1 ? 'h-full' : 'w-full'}`}
          style={{
            maxWidth: `${ratio > 1 && Math.ceil(ratio * 100)}%`,
            maxHeight: `${ratio > 1 && Math.ceil(100 / ratio)}`,
          }}
          src={`data:image/png;base64,${src?.buffer}`}
          alt={alt}
        />
      )}
    </div>
  );
};

export default Avatar;
