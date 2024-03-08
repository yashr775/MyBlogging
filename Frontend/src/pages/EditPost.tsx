import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

interface PostData {
  $id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
}

function EditPost() {
  const [post, setPost] = useState<PostData | null>(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((postData) => {
        if (postData) {
          const mappedPost: PostData = {
            $id: postData.$id,
            title: postData.title,
            slug: postData.slug,
            content: postData.content,
            featuredImage: postData.featuredImage,
            status: postData.status,
            userId: postData.userId,
          };
          setPost(mappedPost);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
