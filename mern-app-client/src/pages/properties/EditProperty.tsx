import { useGetIdentity, useShow } from "@refinedev/core";
import { useState } from "react";
import Form from "../../components/common/Form";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";

const EditProperty = () => {
  const { data: identity } = useGetIdentity<{
    id: number;
    fullName: string;
    email: string;
  }>();

  const { queryResult } = useShow();

  // Get the image to edit
  // const { data, isLoading, isError } = queryResult;

  // const propertyDetails = data?.data ?? {};
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
  

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPropertyImage({ name: file?.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) return alert("Please select an image");
   
    onFinish({
      ...data,
      photo: propertyImage.url,
      email: identity?.email,
    });
  };

  return (
    <Form
      type="Edit"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};

export default EditProperty;
