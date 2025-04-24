import Post from "./Post";
import ProfileDetailes from "./ProfileDetailes";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import '../style/Body.css';
import NewPostFeald from "./NewPostFeald";
import { PostsContext } from "./context/PostsContext";
import { UsersContext } from "./context/UsersContext";
import { CommentsContext } from "./context/CommentsContext";
import cake from "../assets/lazycatecake.webp"



const posts = [
    {
        id:"1",
        iduser:"1",
        date:"2025/07/24",
        title:"kikat ahmed zin smiya",
        pic: cake,
        rating:"5",
        description:"kika zwina kika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwina",
    },
    {
        id:"2",
        iduser:"2",
        date:"2025/07/25",
        title:"couscous",
        pic:cake,
        rating:"1",
        description:"kika zwina kika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwina",

    },
    {
        id:"3",
        iduser:"3",
        date:"2025/07/26",
        title:"rfisa",
        pic:cake,
        rating:"4.5",
        description:"kika zwina kika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwinakika zwina",

    }
];

const comments=[
        {
            id:"1",
            iduser:"2",
            idpost:"1",
            date:"2025/07/24",
            comment:"kika nadya"
        },
        {
            id:"2",
            iduser:"3",
            idpost:"3",
            date:"2025/07/24",
            comment:"kika nadya ghir howa dik smiya raha walo chof liha chi hal"
        }
];

const users=[
    {
        id:"1",
        name:"Aymen Igri"
    },
    {
        id:"2",
        name:"Assiya"
    },
    {
        id:"3",
        name:"Oumaima"
    },
]

export default function Body(){

    return(
        <>
            <Box sx={{ flexGrow: 1 , position:"relative",top:20 }}>
                <Grid container spacing={2}>
                    <Grid size={3}>
                        <UsersContext.Provider value={users} >
                            <ProfileDetailes />
                        </UsersContext.Provider>
                    </Grid>
                    <Grid size={9}>
                        <UsersContext.Provider value={users} > 
                            <PostsContext.Provider value={posts}>
                                <CommentsContext.Provider value={comments} >
                                    <NewPostFeald />
                                    <Post/>
                                </CommentsContext.Provider>
                            </PostsContext.Provider>        
                        </UsersContext.Provider>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}