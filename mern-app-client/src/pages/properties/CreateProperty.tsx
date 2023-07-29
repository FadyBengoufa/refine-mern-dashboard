import { useGetIdentity } from "@refinedev/core";
import { useState } from "react";
import Form from "../../components/common/Form";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";

const CreateProperty: React.FC = () => {
  const { data: identity } = useGetIdentity<{
    id: number;
    fullName: string;
    email: string;
  }>();

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

    // In the tutorial, he was awaiting and that caused an issue, it wasn't showing the notification.
    // Thankfully I know the basics lol <3.
    onFinish({
      ...data,
      photo: propertyImage.url,
      email: identity?.email,
    });
  };

  return (
    <Form
      type="Create"
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

export default CreateProperty;
