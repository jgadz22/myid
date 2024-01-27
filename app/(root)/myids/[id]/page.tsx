import { getMyidById } from "@/lib/actions/myid.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const MyidDetails = async ({ params: { id } }: SearchParamProps) => {
  const myid = await getMyidById(id);

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="flex flex-col w-full max-w-5xl items-center justify-center p-3">
          <Image
            src={myid.imageUrl}
            alt="ID image"
            width={1000}
            height={500}
            className="max-h-[500px] object-center object-contain"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6 items-center justify-center">
              <h2 className="h2-bold">{myid.idTitle}</h2>

              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {myid.idNumber}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{" "}
                <span className="text-primary-500">
                  {myid.organizer.firstName} {myid.organizer.lastName}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyidDetails;
