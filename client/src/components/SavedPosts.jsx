import MainUserSavedPosts from "./MainUserSavedPosts";
import '../style/Posts.css';

export default function SavedPosts(){
    return(
        <div className="saved-posts-page">
            <MainUserSavedPosts />
        </div>
    );
}