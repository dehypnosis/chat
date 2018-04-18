const avatarUrls = [
  'http://static.codeflow.study/gCf9YhuhKttewTvbMgByLYCHuaXdAhfKedwScNUT.jpeg',
  'http://static.codeflow.study/XjSfd43v8WPTfvQg9ckmJwjkuWB9jW7TYPmi0ioj.jpeg',
  'http://static.codeflow.study/8msdv6DEQpNvSRTSp3xOfuhM9ZpJqxkE45CSTPWR.jpeg',
  'http://static.codeflow.study/NeQ9hK6Ulpw0Dp1FVUceSZOVBCTJawl08gEfOQ1P.jpeg',
  'http://static.codeflow.study/hov86LtvlSkyq8Wvx67ElyGdeU8av5d6cNwO0X1x.jpeg',
  'http://static.codeflow.study/7QdZSOriefaYBU5DzZxvl4tg703Dj9aanVERorWb.jpeg',
];

const dummyUsers = [
  {
    id: 1,
    nickname: '유저1',
    avatarUrl: avatarUrls[0],
  },
  {
    id: 2,
    nickname: '유저2',
    avatarUrl: avatarUrls[1],
  },
  {
    id: 3,
    nickname: '유저3',
    avatarUrl: avatarUrls[2],
  },
];

const dummyMessages = [
  {
    id: 1,
    user: dummyUsers[0],
    content: '안녕하세요?',
    at: 1523305148,
  },
  {
    id: 2,
    user: dummyUsers[1],
    content: '반갑습니다.',
    at: 1523305248,
  },
  {
    id: 3,
    user: dummyUsers[2],
    content: '그러게요.',
    at: 1523305448,
  },
]

export { avatarUrls };
