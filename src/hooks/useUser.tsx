import storage from "@/utils/storage";

export function useUser() {
  const userData = storage.getToken();

  const user = userData?.staff;

  return { user };
}
