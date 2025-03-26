import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../style/Body.css';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import GradeIcon from '@mui/icons-material/Grade';
import CardHeader from '@mui/material/CardHeader';
import cake from '../assets/lazycatecake.webp'
import { Button, Divider } from '@mui/material';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ReportIcon from '@mui/icons-material/Report';
import Comments from './comments';
import CommentInput from './CommentInput';


export default function Post() {
  const [showFullText, setShowFullText] = useState(false);
  const [showComments, setShowComments] = useState(false);

  

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const fullText = `Ingredients for Lazy Cat Cake
Cream Cheese Filling:
200g cream cheese
250g mascarpone
3 tablespoons condensed milk
Base Layer:
6 slices of shop-bought chocolate loaf cake (each about 1.5 inches thick)
100ml chocolate milk (store-bought or homemade)
Chocolate Ganache:
200g chocolate (dark or milk, depending on preference)
100ml double cream
Crispy Topping:
100g milk chocolate
80g Coco Pops
40g cocoa powder
Instructions for Lazy Cat Cake
Step 1: Make the Cream Cheese Filling
In a mixing bowl, combine the cream cheese, mascarpone, and condensed milk. Whisk together until smooth and creamy. Set aside.

Step 2: Assemble the Base Layer
Lay the slices of chocolate loaf cake in a dish, ensuring they are snugly arranged. Pour the chocolate milk evenly over the cake slices to soak them.

Step 3: Add the Cream Cheese Layer
Spread the prepared cream cheese mixture over the soaked cake layer. Use a spatula or offset spatula to smooth it out evenly. Place the dish in the fridge to chill while you prepare the ganache.

Step 4: Make the Chocolate Ganache
In a microwave-safe bowl, add the chocolate and double cream. Heat in 30-second intervals, stirring between each until the mixture is silky smooth. Once ready, spread the ganache evenly over the chilled cream cheese layer.

Step 5: Prepare the Crispy Topping
In a sealed Tupperware container, combine the milk chocolate, Coco Pops, and cocoa powder. Close the lid tightly and give it a good shake to coat the cereal evenly.

Step 6: Final Assembly and Serve
Sprinkle the crispy topping over the ganache layer, ensuring an even distribution. Slice, serve, and enjoy your Lazy Cat Cake!

This dessert is proof that delicious treats don’t have to be complicated. With its creamy filling, rich chocolate layers, and crunchy topping, it’s no wonder this cake has taken social media by storm! Try it out and let me know if it lives up to the hype.`

  const truncatedText = fullText.slice(0, 200) + '...';

  return (
      <>
          <Box>
              <Card variant="outlined" className="post">
                  <React.Fragment>
                      <CardContent>
                          <Typography gutterBottom>
                            
                                <Grid container spacing={2}>
                                  
                                    <Grid size={10}>
                                        <CardHeader
                                            avatar={<Avatar className="propic3">AI</Avatar>}
                                            title="Aymen Igri"
                                            subheader="September 14, 2016"
                                            className='userinfo'
                                            sx={{color:'white'}}
                                        />
                                    </Grid>
                                    <Grid size={2} className='grad_result'>
                                        <GradeIcon className='star'/>
                                        <h6>5/5</h6>
                                    </Grid>
                                    <Grid size={5}>
                                        <img src={cake} alt="cake" className='post_img' />
                                    </Grid>
                                    <Grid size={7} className="title_p">
                                      <Typography variant="h4" component="h1" className="post_title">
                                          kikat ahmed zwin smiya
                                      </Typography>
                                      <p>
                                          {showFullText ? fullText : truncatedText}
                                      </p>
                                      <Button variant='text' onClick={handleToggleText} >{showFullText ? 'See Less' : 'See More'}</Button>
                                    </Grid>
                              
          
                          </Grid>
                          <ButtonGroup variant="outlined" aria-label="Basic button group" className='button_g' sx={{ 
                    width: '100%', 
                    display: 'flex',
                    marginTop: '3%',
                    // Remove the blue border between buttons
                    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                      borderColor: '#2B2B2B', // Match with button background color
                    },
                    // Remove focus outline and border for all states
                    '& .MuiButtonGroup-grouped:focus, & .MuiButtonGroup-grouped:active, & .MuiButtonGroup-grouped:focus-visible': {
                      outline: 'none !important',
                      border: 'none !important',
                      boxShadow: 'none !important',
                      borderRight: '1px solid #2B2B2B !important', // Match with button background
                    },
                    // Style for all buttons in the group
                    '& .MuiButton-root': {
                      flex: 1,
                      justifyContent: 'center',
                      color: '#E6E6E6',
                      background:'transparent',
                      transition: '0.3s',
                      outline: 'none',
                      border: 'none',
                      marginBottom:'-3%',
                      '&:hover': {
                        color: '#2B2B2B',
                        backgroundColor: "#B22222",
                        boxShadow: 10
                      },
                      '&:focus, &:active, &:focus-visible': {
                        outline: 'none !important',
                        boxShadow: 'none !important',
                      }
                    }
                  }}>
                            <Button className='rating'>
                            <Stack spacing={1} >
                              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                            </Stack>
                            </Button>
                            <Button onClick={handleToggleComments}>
                                <ModeCommentIcon/> 
                                Comment
                            </Button>
                            <Button >
                                <BookmarkIcon/> 
                                Save
                            </Button>
                            <Button >
                                <ReportIcon/> 
                                Report
                            </Button>
                          </ButtonGroup>
                          </Typography>
                          {showComments && (
        <>
        <div className='commentchoi'>
        <Divider />

          <CommentInput />
          <Comments />
          </div>
        </>
      )}
                      </CardContent>
                  </React.Fragment>
              </Card>
          </Box>
          
      </>
  );
}

