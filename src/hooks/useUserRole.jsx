import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

import useAxios from './useAxios';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosInstance = useAxios();

    // const {
    //     data: role = 'user',
    //     isLoading: roleLoading,
    //     refetch,
    // } = useQuery({
    //     queryKey: ['userRole', user?.email],
    //     enabled: !authLoading && !!user?.email,
    //     queryFn: async () => {
    //         const res = await axiosInstance.get(`/users/${user.email}/role`);
    //         // const res = await axiosSecure.get(`/users/${encodeURIComponent(user.email)}/role`);
    //         return res.data.role;
    //     },
    // });

    const {
        data: role = 'user',
        isLoading: roleLoading,
        refetch,
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/${user.email}/role`);
            return res.data.role;
        },
        // staleTime: 0,
        // refetchOnMount: true,
    });


    return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;