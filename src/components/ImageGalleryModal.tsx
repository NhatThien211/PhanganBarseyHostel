/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useEffect, useState } from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ImageGalleryModalProps {
  images: string[],
  isOpen: boolean,
  onClose: () => void
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({ images, isOpen, onClose }) => {
  const [hotelImages, setHotelImages] = useState<ReactImageGalleryItem[]>([]);

  useEffect(() => {
    const mappedImage = images.map((t: any) => ({ original: t}))
    setHotelImages(mappedImage);

  }, [images])

  return (
    <>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999] bg-black bg-opacity-90">
          <button
            onClick={() => onClose()}
            className="absolute top-4 text-black right-4 text-2xl hover:bg-gray-200 transition rounded-[100px] bg-white items-center justify-between p-4"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-5xl p-4">
            {/* Close Button */}
            <ImageGallery
              items={hotelImages}
              showThumbnails={false}
              showFullscreenButton={true}
              showBullets={true}
              showPlayButton={true}
              showIndex={true}
              additionalClass='rounded-[18px] overflow-hidden'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGalleryModal;
