export interface Publications {
  items: Item[];
  pageInfo: PageInfo;
}

export interface Item {
  __typename: string;
  id: string;
  profile: Profile;
  stats: ItemStats;
  metadata: Metadata;
  createdAt: Date;
  collectModule: CollectModule;
  referenceModule: null;
  appId: null;
  hidden: boolean;
  reaction: null;
  mirrors: any[];
  hasCollectedByMe: boolean;
}

export interface CollectModule {
  __typename: string;
  type: string;
}

export interface Metadata {
  name: string;
  description: string;
  content: string;
  media: null;
  attributes: any[];
}

export interface Profile {
  id: string;
  name: null;
  bio: null;
  attributes: Attribute[];
  isFollowedByMe: boolean;
  isFollowing: boolean;
  followNftAddress: null;
  metadata: string;
  isDefault: boolean;
  handle: string;
  picture: null;
  coverPicture: null;
  ownedBy: string;
  dispatcher: null;
  stats: ProfileStats;
  followModule: null;
}

export interface Attribute {
  displayType: null;
  traitType: null;
  key: string;
  value: string;
}

export interface ProfileStats {
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
  totalComments: number;
  totalMirrors: number;
  totalPublications: number;
  totalCollects: number;
}

export interface ItemStats {
  totalAmountOfMirrors: number;
  totalAmountOfCollects: number;
  totalAmountOfComments: number;
}

export interface PageInfo {
  prev: string;
  next: string;
  totalCount: number;
}
