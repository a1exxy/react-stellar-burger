export const getAccessToken = (onlyToken: boolean = false): string | null => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    if (onlyToken) {
      return token.replace('Bearer ', '')
    } else {
      return token
    }
  } else {
    return null
  }
}


export const setTokensToLocalStorage = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}
