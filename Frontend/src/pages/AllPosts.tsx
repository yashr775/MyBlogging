import React, { useState, useEffect } from "react";
import { Container } from "../components";
import appwriteService from "../appwrite/config";
import { Models } from "appwrite";
import PostCard from "../components/PostCard";

// interface Document {
//   databaseId: string;
//   collectionId: string;
//   documentId: string;
//   queries?: string[] | undefined;
// }

function AllPosts() {
  const [posts, setPosts] = useState<Models.Document[]>([]);

  useEffect(() => {});
  appwriteService.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard title={""} featuredImage={""} {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
