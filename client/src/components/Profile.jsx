import UserDetaInfo from "./UserDetaInfo";
import MainUserPosts from "./MainUserPosts";
import { PostsContext } from "./context/PostsContext";
import { CommentsContext } from "./context/CommentsContext";
import { UsersContext } from "./context/UsersContext";
import { Stack } from "@mui/material";
import '../style/Posts.css';

export default function Profile() {
    return (
        <Stack spacing={3} sx={{ width: '100%' }} className="profile-page">     
            <div className="user-info-section">
                <UserDetaInfo />
            </div>
            <MainUserPosts />
        </Stack>
    );
}