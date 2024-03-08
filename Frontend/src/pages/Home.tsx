import React, { useEffect, useState } from "react";
import { Container } from "../components";
import PostCard from "../components/PostCard";
import { Models } from "appwrite";
import appwriteService from "../appwrite/config";

interface PostData {
  $id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
}

function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    appwriteService.getPosts().then((response) => {
      if (response) {
        const documentsTemp = response as Models.DocumentList<Models.Document>;
        const postDataArray = documentsTemp.documents.map((doc) => ({
          $id: doc.$id,
          title: doc.title || "",
          slug: doc.slug || "",
          content: doc.content || "",
          featuredImage: doc.featuredImage || "",
          status: doc.status || "",
          userId: doc.userId || "",
        }));
        setPosts(postDataArray);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
