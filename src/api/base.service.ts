export const getAuthHeaders = () => {
  const context = JSON.parse(sessionStorage.getItem('context')!);
  const accessToken = context?.accessToken;

  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + accessToken,
  };
}

export const getRefreshToken = () => {
    const context = JSON.parse(sessionStorage.getItem('context')!);
  const refreshToken = context?.refreshToken;
  return refreshToken;
}

export const handleSignOut = () => {
  sessionStorage.clear();
  window.location.href = ''
}