// Types
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Profile } from '@/types/profile';
import { ServerError } from '@/types/services';

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

  if (profile instanceof ServerError) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      profile,
    },
  };
};

const Profile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ profile }) => {
  return (
    <div>
      {profile.picture?.original ? (
        <img
          src={profile.picture.original.url}
          alt={profile.name}
          className="object-cover w-16 h-16 rounded-md"
        />
      ) : (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
      <h2>{profile.handle}</h2>
      <p>{profile.bio}</p>
      <p>Followers: {profile.stats.totalFollowers}</p>
      <p>Following: {profile.stats.totalFollowing}</p>
    </div>
  );
};

export default Profile;
