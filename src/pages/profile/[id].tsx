// Types
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Profile } from '@/types/profile';

// Services
import { getProfile } from '@/services/profiles';

interface ProfilePageProps {
  profile: Profile;
}

interface ProfilePageParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<
  ProfilePageProps,
  ProfilePageParams
> = async ({ params }) => {
  const { id } = params as ProfilePageParams;

  const profile = await getProfile(id as string);

  return {
    props: {
      profile,
    },
  };
};

const Profile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ profile }) => {
  console.log(profile);

  return <div>Profile</div>;
};

export default Profile;
