
import { AnnouncementContext } from "./AnnouncementContext";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";


const AnnouncementProvider = ({ children }) => {
const axiosInstance= useAxios()

    const {
    data: count = 0,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["announcementCount"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/announcements/count`);
      return res.data.count; // assuming server sends { count: 5 } OR just 5
    },
    staleTime: 10000, // optional: 10s cache
  });

    // console.log(announcementCount)

    const announcementInfo={
         count, refetch, isLoading, isError 
    }

  return (
    <AnnouncementContext.Provider value={announcementInfo}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export default AnnouncementProvider;
