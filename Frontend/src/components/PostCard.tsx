import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

interface PostCartProps {
  $id: string;
  title: string;
  featuredImage: string;
}

function Postcard({ $id, title, featuredImage }: PostCartProps) {
  const imageUrl = appwriteService.getFilePreview(featuredImage).toString();
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img src={imageUrl} alt={title} className="rounded-xl" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default Postcard;
