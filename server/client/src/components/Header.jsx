import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import '../style/Header.css';
import logo from '../assets/logo.png'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export default function Header(){
    
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    return (
        <div className="header"  >
            <Grid container spacing={2} sx={{boxShadow:10 ,height: '60px', alignItems:'center'}}>
                <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' ,height:'100%'}}>
                    <Grid item >
                    <img src={logo} alt="aji ntaybo" style={{ width: '80px', height: 'auto'}} />
                    </Grid>
                
                <Grid item sx={{ display:'flex' , alignItems:'center' ,justifyContent:'center',marginLeft:'10px'}}>
                    <Paper
                        component="form"
                        sx={{ p: '1px 1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',width: '100%', maxWidth: '1200px', minWidth: '30px', backgroundColor:'#2B2B2B', color:'#E6E6E6','&:hover':{boxShadow:10}}}
                    >
                        <InputBase
                            sx={{ ml: 2, flex: 1 , width:'1200px' ,color:'#E6E6E6', height:'100%'}}
                            placeholder="Ach ghantaybo lyoum ?"
                            inputProps={{ 'aria-label': 'Ach ghantaybo lyoum ?' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' , color:'#8B0000','&:hover': {color: '#2B2B2B', backgroundColor: '#8B0000', }}} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <Box sx={{ minWidth: 120 , alignItems:'center'}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{color:'gray','&.Mui-focused': {color: 'gray',}}}>Choix</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="choie du recherche"
                                onChange={handleChange}
                                sx={{height: '49px',backgroundColor:'#2B2B2B',color: '#E6E6E6',transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                                        '& .MuiSelect-icon': {  
                                            color: '#E6E6E6'
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#8B0000', // Border color
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
                                            backgroundColor: '#2B2B2B',
                                            color: '#E6E6E6',
                                            '& .MuiMenuItem-root': {
                                                '&:hover': {
                                                    backgroundColor: '#3B3B3B',
                                                },
                                                '&.Mui-selected': {
                                                    backgroundColor: '#8B0000',
                                                    color: '#FFFFFF',
                                                    '&:hover': {
                                                        backgroundColor: '#7B0000',
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }}
                            >
                                <MenuItem value={10} >Titre</MenuItem>
                                <MenuItem value={20}>Descripiton</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                
                <Grid item sx={{display:'flex',flexDirection:'row',marginLeft:'10px'}}>
                    <Avatar sx={{color:'#8B0000',backgroundColor:'#2B2B2B',transition: '0.3s','&:hover': {backgroundColor: '#8B0000',color: '#2B2B2B',boxShadow:10}}}>AN</Avatar>
                    <div style={{display:'flex',justifyContent:'center',flexDirection:'column', marginLeft:'5px'}}>
                      <span style={{color:'#E6E6E6'}}>Aji Ntaybo</span>
                      <span style={{color:'#E6E6E6',fontSize:'10px'}}>ID : 12345</span>
                    </div>
                </Grid>
            </Grid>
            </Grid>
        </div>
    );
}