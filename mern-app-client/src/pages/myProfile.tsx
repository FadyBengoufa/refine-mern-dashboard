import { useGetIdentity, useOne } from "@refinedev/core";
import Profile from "../components/common/Profile";
import { Box, Typography } from "@mui/material";
import { PropertyCard } from "../components";

const MyProfile = () => {
  const { data: identity } = useGetIdentity<{
    id: number;
    fullName: string;
    email: string;
    userid: string;
  }>();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: identity?.userid,
  });

  const myProfile = data?.data ?? [];
  const myProperties = data?.data.allProperties.slice(0,3);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
    <>
      <Profile
        type="My"
        // @ts-ignore
        name={myProfile.name}
        // @ts-ignore
        email={myProfile.email}
        // @ts-ignore
        avatar={myProfile.avatar}
        // @ts-ignore
        properties={myProfile.allProperties}
      />
      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          My Properties
        </Typography>
        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {myProperties.map((property: any) => (
            <PropertyCard
              key={property._id}
              id={property._id}
              title={property.title}
              location={property.location}
              price={property.price}
              photo={property.photo}
            />
          ))}
          {myProperties.length === 0 ? 'No properties available in your profile.' : ''}
        </Box>
      </Box>
    </>
  );
};

export default MyProfile;
