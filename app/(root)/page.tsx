import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { getAllMyids, getMyidsByUser } from "@/lib/actions/myid.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

export default async function Home({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const myidsPage = Number(searchParams?.myidsPage) || 1;

  const searchText = (searchParams?.query as string) || "";

  const myids = await getAllMyids({
    query: searchText,
    userId,
    page: myidsPage,
    limit: 6,
  });

  return (
    <>
      {/* MyiD Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Digital ID's</h3>
        </div>
      </section>

      <div className="flex w-full flex-col gap-5 md:flex-row items-center justify-center mt-10">
        <Search />
      </div>

      <section className="wrapper my-8">
        <Collection
          userId={userId}
          data={myids?.data}
          emptyTitle="No Digital ID's have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Myids_Organized"
          limit={3}
          page={myidsPage}
          urlParamName="myidsPage"
          totalPages={myids?.totalPages}
        />
      </section>
    </>
  );
}
