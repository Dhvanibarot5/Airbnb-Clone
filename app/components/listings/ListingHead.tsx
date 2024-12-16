'use client';

import Image from "next/image";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  // Format Cloudinary URL
  const imageUrl = imageSrc?.startsWith('http') 
    ? imageSrc 
    : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${imageSrc}`;

  if (!imageUrl) {
    return null;
  }

  return ( 
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="
        w-full
        h-[60vh]
        overflow-hidden 
        rounded-xl
        relative
      ">
        <Image
          src={imageUrl}
          fill
          className="object-cover w-full"
          alt={title || "Listing"}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="
          absolute
          top-5
          right-5
        ">
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
   );
}
 
export default ListingHead; 