export const USER_BY_EMAIL = `
  *[_type == "user" && email == $email][0]{
    _id, name, username, email, image, bio, password, githubId, bought
  }
`

export const USER_BY_GITHUB_ID = `
  *[_type == "user" && githubId == $id][0]{
    _id, name, username, email, image, bio, password, githubId, bought
  }
`
