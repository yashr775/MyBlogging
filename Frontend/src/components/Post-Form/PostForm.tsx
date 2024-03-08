import React, { useCallback } from "react";
import { Button, Input } from "../index";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "../Select";
import RTE from "../RTE";

interface FormData {
  image: FileList | null;
  title: string;
  slug: string;
  content: string;
  featuredImage: string; // Allow null since it's optional
  status: string;
}

interface PropTypes {
  post: {
    $id: string;
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
    userId: string;
  };
}

export interface StateTypes {
  user: {
    userData: {
      $id: string;
      name: string;
      created: Date;
      updated: Date;
    };
  };
}

function PostForm({ post }: PropTypes) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm<FormData>({
      defaultValues: {
        title: post?.title || " ",
        slug: post?.slug || " ",
        content: post?.content || " ",
        status: post?.status || "active",
        image: null,
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state: StateTypes) => state.user.userData);

  const submit: SubmitHandler<FormData> = async (data) => {
    if (data.image !== null) {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          appwriteService.deleteFile(post.featuredImage);
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : "",
        });
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId; // Add this line to include featuredImage
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    }
  };

  const slugTransform = useCallback((value: string) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(
    () => {
      const subscription = watch((value, { name }) => {
        if (name === "title") {
          setValue("slug", slugTransform(value.title ?? " "), {
            shouldValidate: true,
          });
        }
      });

      return () => subscription.unsubscribe();
    },
    [watch, slugTransform, setValue] as const
  );

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e: { currentTarget: { value: string } }) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService
                .getFilePreview(post.featuredImage)
                .toString()}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
