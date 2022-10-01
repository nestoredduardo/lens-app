import { getRecommendedProfiles } from '@/services/profiles/getRecommendedProfiles';

// Types
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { Profile } from '@/types/profile';

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

  return <div></div>;
};

export default Home;
