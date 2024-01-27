import { IMyid } from "@/lib/database/models/myid.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardProps = {
  myid: IMyid;
};

const Card = ({ myid }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isMyidCreator = userId === myid.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/myids/${myid._id}`}
        style={{ backgroundImage: `url(${myid.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      {/* IS MYID CREATOR ... */}

      {isMyidCreator && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/myids/${myid._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <Link href={`/myids/${myid._id}/delete`}>
            <Image
              src="/assets/icons/delete.svg"
              alt="delete"
              width={20}
              height={20}
            />
          </Link>
        </div>
      )}
      <div className="flex min-h-[150px] flex-col gap-3 p-5 md:gap-4">
        <Link href={`/myids/${myid._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {myid.idTitle}
          </p>
        </Link>

        <div className="flex">
          <p className="p-semibold-16 w-min text-green-600">{myid.idNumber}</p>
        </div>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {myid.organizer.firstName} {myid.organizer.lastName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
