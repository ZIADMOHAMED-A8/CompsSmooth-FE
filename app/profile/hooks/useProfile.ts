"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProfileAction,
  updateProfileAction,
} from "../actions/profileActions";

const profileQueryKey = ["profile"];

export function useProfile() {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfileAction,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileAction,
    onSuccess: (data) => {
      queryClient.setQueryData(profileQueryKey, data);
      queryClient.invalidateQueries({ queryKey: profileQueryKey });
    },
  });
}
