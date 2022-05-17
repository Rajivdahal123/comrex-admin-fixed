import React, { useEffect, useRef, useState } from 'react';

type IMainProps = {
  onChange: (avatar: string) => void;
  value?: string | File | any;
};

const ProfileImage = ({ value, onChange }: IMainProps) => {
  const [ratio, setRatio] = useState(1);
  // const { updateProfileImage } = useAuth();
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (value) {
      setUrl(
        value instanceof File
          ? URL.createObjectURL(value)
          : `data:image/png;base64,${value?.buffer}`
      );
    }
    const image = new Image();
    image.src =
      value instanceof File
        ? URL.createObjectURL(value)
        : `data:image/png;base64,${value?.buffer}`;
    image.addEventListener('load', function() {
      setRatio(this.width / this.height);
    })

  }, [value]);

  const fileSelector = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleClick = () => {
    fileSelector.current.click();
  };

  const handleFileUpload = (event: any) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      onChange(files[0]);
      setUrl(URL.createObjectURL(files[0]));
    }
  };

  return (
    <>
    <div
      className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto bg-gray-400 rounded-full overflow-hidden cursor-pointer hover:shadow-xl relative flex font-regularHN">
      <input
        style={{ display: 'none' }}
        type="file"
        ref={fileSelector}
        accept="image/jpeg, image/png, image/gif"
        onChange={handleFileUpload}
        multiple
      />
      {/* {value && ( */}
        <img
          src={url || '/images/profile_avatar.jpg'}
          alt="profile-image"
          className={`absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] ${
            ratio > 1 ? 'h-full' : 'w-full'
          }`}
          style={{
            maxWidth: `${ratio > 1 && Math.ceil(ratio * 100)}%`,
            maxHeight: `${ratio > 1 && Math.ceil(100 / ratio)}`,
          }}
        />
      {/* )} */}
    </div>
    <p className="mt-5 ml-0 md:ml-32 lg:ml-36 whitespace-nowrap md:transform md:translate-x-[-50%] underline cursor-pointer text-center text-lightGray" onClick={handleClick}>Edit Picture</p>
    </>
  );
};

export default ProfileImage;
