import UserDetaInfo from "./UserDetaInfo";
import cake from "../assets/lazycatecake.webp";
import MainUserPosts from "./MainUserPosts";
import { PostsContext } from "./context/PostsContext";
import { CommentsContext } from "./context/CommentsContext";
import { UsersContext } from "./context/UsersContext";


const posts = [
    {
        id: "1",
        iduser: "1",
        date: "2025/07/24",
        title: "kikat ahmed zin smiya",
        pic: cake,
        rating: "5",
        description: "kika zwina kika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwina",
    }
];

const comments = [
    {
        id: "1",
        iduser: "3",
        idpost: "1",
        date: "2025/07/24",
        comment: "kika nadya"
    }
];

const users = [
    {
        id: "1",
        name: "AYMEN IGRI",
    },
    {
        id: "2",
        name: "assia",
    },
    {
        id: "3",
        name: "oumaima",
    }
];



export default function SavedPosts(){
    return(
        <div className="savedpost">
                        <CommentsContext.Provider value={comments}>
                            <PostsContext.Provider value={posts}>
                                <UsersContext.Provider value={users}> 
                                    <MainUserPosts />
                                </UsersContext.Provider>
                            </PostsContext.Provider>
                        </CommentsContext.Provider>
        </div>
    );
}