export const getAccessToken = (onlyToken) => {
  const token = localStorage.getItem("accessToken")
  if(onlyToken) {
    return token.replace('Bearer ', '')
  } else {
    return token
  }
}


export const setTokensToLocalStorage = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}
