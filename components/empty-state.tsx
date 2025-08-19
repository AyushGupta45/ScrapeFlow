import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  description: string;
  image?: string;
}

const EmptyState = ({ title, description, image = "/empty.svg" }: Props) => {
  return (
    <div className="px-8 flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 rounded-lg p-10">
        <Image src={image} alt="Empty" height={240} width={240} />
        <div className="flex flex-col gap-y-2 max-w-md mx-auto text-center">
          <h1 className="text-lg font-medium">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
