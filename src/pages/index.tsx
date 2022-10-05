import Link from 'next/link';
import Image from 'next/image';

// Types
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { Profile } from '@/types/profile';

// Services
import { getRecommendedProfiles } from '@/services/profiles';

interface HomePageProps {
  recommendedProfiles: Array<Profile>;
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const recommendedProfiles = await getRecommendedProfiles();

  return {
    props: {
      recommendedProfiles,
    },
  };
};

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { recommendedProfiles } = props;

  return (
    <div className="flex flex-col gap-4">
      {recommendedProfiles.map((profile) => (
        <Link href={`/profile/${profile.id}`} key={profile.id}>
          <a>
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
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Home;
