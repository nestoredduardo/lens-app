// Types
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Profile } from '@/types/profile';
import { Publications } from '@/types/post';
import { ServerError } from '@/types/services';

// Services
import { getProfile, getPost } from '@/services/profiles';

// Utils
import ABI from '@/utils/abi.json';

interface ProfilePageProps {
  profile: Profile;
  post: Publications;
}

interface ProfilePageParams extends ParsedUrlQuery {
  id: string;
}

const address = '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d';

export const getServerSideProps: GetServerSideProps<
  ProfilePageProps,
  ProfilePageParams
> = async ({ params }) => {
  const { id } = params as ProfilePageParams;

  const profile = getProfile(id as string);
  const post = getPost(id as string);

  const [profileData, postData] = await Promise.all([profile, post]);

  if (profileData instanceof ServerError || postData instanceof ServerError) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      profile: profileData,
      post: postData,
    },
  };
};

const Profile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ profile, post }) => {
  console.log(post);

  const connect = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log(accounts);
  };

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

      <ul className="flex flex-col gap-2">
        {post.items.map((item) => (
          <li key={item.id} className="p-2 bg-gray-50 border border-gray-100">
            {item.metadata.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
