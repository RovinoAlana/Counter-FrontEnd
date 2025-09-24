import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home - Counter App",
  description: "Halaman utaman aplikasi App counter",
};

const page = ({ params }: { params: { slug: string[] } }) => {
  return (
    <div>
      <p>Params: {JSON.stringify(params)}</p>
      <p>Slug: {params.slug.join(", ")}</p>
    </div>
  );
};

export default page;
