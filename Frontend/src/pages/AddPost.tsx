import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <PostForm
          post={{
            $id: "",
            title: "",
            slug: "",
            content: "",
            featuredImage: "",
            status: "",
            userId: "",
          }}
        />
      </Container>
    </div>
  );
}

export default AddPost;
