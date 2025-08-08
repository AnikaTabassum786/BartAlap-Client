import { use} from "react";
import { AnnouncementContext } from "../context/AnnouncementContext";


const useAnnouncement = () => {
    const announcementInfo = use(AnnouncementContext)
    return announcementInfo
}

export default useAnnouncement;


