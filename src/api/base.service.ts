export const getAuthHeaders = () => {
  const context = JSON.parse(localStorage.getItem('context')!);
  const accessToken = context?.accessToken;

  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + accessToken,
  };
}