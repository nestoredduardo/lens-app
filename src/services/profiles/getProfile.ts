import { gql } from '@apollo/client';
import client from '@/services/apollo-client';

import { Profile } from '@/types/profile';
import { ServerError } from '@/types/services';

export interface ProfileQueryResponse {
  profile: Profile;
}

export const getProfile = async (
  id: string
): Promise<Profile | ServerError> => {
  try {
    const { data } = await client.query<ProfileQueryResponse>({
      query: gql`
        query Profile {
          profile(request: { profileId: "${id}" }) {
            id
            name
            bio
            attributes {
              displayType
              traitType
              key
              value
            }
            followNftAddress
            metadata
            isDefault
            picture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  mimeType
                }
              }
              __typename
            }
            handle
            coverPicture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  mimeType
                }
              }
              __typename
            }
            ownedBy
            dispatcher {
              address
              canUseRelay
            }
            stats {
              totalFollowers
              totalFollowing
              totalPosts
              totalComments
              totalMirrors
              totalPublications
              totalCollects
            }
            followModule {
              ... on FeeFollowModuleSettings {
                type
                amount {
                  asset {
                    symbol
                    name
                    decimals
                    address
                  }
                  value
                }
                recipient
              }
              ... on ProfileFollowModuleSettings {
                type
              }
              ... on RevertFollowModuleSettings {
                type
              }
            }
          }
        }
      `,
    });

    return data.profile;
  } catch (error) {
    return new ServerError('Failed to fetch profile');
  }
};
