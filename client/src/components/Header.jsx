import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import '../style/Header.css';
import logo from '../assets/logo.png'
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { MainUserContext } from './context/MainUserContext';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { SearchContext } from './context/SearchContext';

export default function Header(){

    let MainUser = useContext(MainUserContext);
    const { searchTerm, setSearchTerm, searchType, setSearchType } = useContext(SearchContext);
    const location = useLocation(); // Get current location
    
    // Initialize value state based on current path
    const [value, setValue] = useState(() => {
        const path = location.pathname;
        if (path.includes('/profile')) return 'Profile';
        if (path.includes('/home') || path === `/user/${MainUser?.id_u}`) return 'Home';
        if (path.includes('/myposts')) return 'saved posts';
        return 'Home'; // Default value
    });

    // Update value when location changes
    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/profile')) {
            setValue('Profile');
        } else if (path.includes('/home') || path === `/user/${MainUser?.id_u}`) {
            setValue('Home');
        } else if (path.includes('/myposts')) {
            setValue('saved posts');
        }
    }, [location.pathname, MainUser?.id_u]);

    const handleChangenavigation = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearchInputChange = (event)=>{
        setSearchTerm(event.target.value);
    }

    const handleSearch = () => {
        // You can add additional search logic here if needed
        console.log(`Searching for: ${searchTerm} in ${searchType}`);
    };

    return (
        <div className="header" >
            <Grid container spacing={2} sx={{boxShadow:10 ,height: '50px', alignItems:'center'}}>
                <Grid xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' ,height:'100%',paddingX: '20px'}}>
                    <Grid xs={2} >
                    <img src={logo || "/placeholder.svg"} alt="aji ntaybo" style={{ width: '65px', height: 'auto'}} />
                    </Grid>
                
                {/* navigation */}
                <Grid  sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)',maxWidth:700,minWidth:200}}>
                    <Box sx={{maxWidth:700,minWidth:200}}>
                    <BottomNavigation sx={{ width: 600 ,backgroundColor: 'transparent','& .MuiBottomNavigationAction-root':{'&.Mui-selected': {color: '#E67E22'}}}} value={value} onChange={handleChangenavigation}>
                        
                        <BottomNavigationAction
                            label="Profile"
                            value="Profile"
                            icon={<div style={{ cursor: 'pointer' }}>
                            {MainUser && MainUser.profilpic_u ? (
                              <Avatar
                                className="propic3"
                                src={`http://localhost:8000/images/${MainUser.profilpic_u}`}
                                sx={{ width: '25px', height: '25px' }}
                              />
                            ) : (
                              <Avatar
                                className="propic3"
                                sx={{ width: '25px', height: '25px' }}
                              >
                                {MainUser?.username_u ? MainUser.username_u[0] : '?'}
                              </Avatar>
                            )}
                          </div>}
                            component={Link}
                            to={MainUser ? `/user/${MainUser.id_u}/profile` : "/"}
                        />
                        <BottomNavigationAction 
                            label="Home" 
                            value="Home" 
                            icon={<HomeRoundedIcon />} 
                            component={Link}
                            to={MainUser ? `/user/${MainUser.id_u}/home` : "/"}
                        />
                        
                        <BottomNavigationAction
                            label="saved posts"
                            value="saved posts"
                            icon={<BookmarksIcon/>}
                            component={Link}
                            to={MainUser ? `/user/${MainUser.id_u}/myposts` : "/"}
                        />

                    </BottomNavigation>
                    </Box>
                </Grid>

                {/*search*/}
                
                <Grid  sx={{ display:'flex' , alignItems:'center' ,justifyContent:'center',marginLeft:'10px',position:'absolute',left:'70%'}}>
                    <Paper
                        component="form"
                        sx={{ p: '1px 1px', display: 'flex', alignItems: 'center',width: '300px', maxWidth: '250px', minWidth: '10px', backgroundColor:'#E5E5E5', color:'black',height:'40px','&:hover':{boxShadow:10}}}
                        onSubmit={(e)=>{e.preventDefault();handleSearch();}}
                    >
                        <InputBase
                            sx={{fontSize:'14px', ml: 2, flex: 1 , width:'1200px' ,color:'black', height:'100%'}}
                            placeholder="Ach ghantaybo lyoum ?"
                            inputProps={{ 'aria-label': 'Ach ghantaybo lyoum ?'}}
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                        />
                    </Paper>
                    {/* select  */}
                    <Box sx={{ minWidth: 100 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{color:'gray',fontSize:'14px',height:'40px','&.Mui-focused': {color: 'gray',}}} />
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={searchType}
                                label="choie du recherche"
                                onChange={handleChange}
                                sx={{height: '40px',fontSize:'14px',backgroundColor:'#E5E5E5',color: '#333333',transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                                        '& .MuiSelect-icon': {  
                                            color: '#E5E5E5'
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#E5E5E5', // Border color
                                            transition: 'border-color 0.3s ease',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'gray', // Border color on hover
                                            boxShadow:10,
                                            
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'gray', // Border color when focused
                                            boxShadow:10,
                                        },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#E5E5E5',
                                            color: '#333333',
                                            '& .MuiMenuItem-root': {
                                                '&:hover': {
                                                    backgroundColor: 'gray',
                                                    color: '#FFFFFF'
                                                },
                                                '&.Mui-selected': {
                                                    backgroundColor: 'gray',
                                                    color: '#FFFFFF',
                                                    '&:hover': {
                                                        backgroundColor: 'gray',
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }}
                            >
                                <MenuItem value={'title'} >Titre</MenuItem>
                                <MenuItem value={'discreption'}>Descripiton</MenuItem>
                            </Select>
                        </FormControl>
                        
                    </Box>
                </Grid>
                
            </Grid>
           </Grid>
        </div>
    );
}