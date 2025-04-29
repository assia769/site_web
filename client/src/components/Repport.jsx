import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useContext , useState , useEffect} from 'react';
import { PostsContext } from './context/PostsContext';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';


export default function Repport({dialogOpen,setDialogOpen,userId, postId}){

    const [report,setReport] = useState('');
        const [csrfToken, setCsrfToken] = useState('');
        
            // Modified CommentInput.jsx with proper CSRF handling
        useEffect(() => {
            fetch('http://localhost:8000/sanctum/csrf-cookie', {
                method: 'GET',
                credentials: 'include' // Important for cookies
            })
            .then(response => {
                // Get the CSRF token from cookies
                const token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1];
                    
                if (token) {
                    setCsrfToken(decodeURIComponent(token));
                }
            })
            .catch(error => console.error('Error fetching CSRF token:', error));
        }, []);

        const handleAddReport = async() => {
            if(!report.trim()){
                alert('Please enter the description of your repport');
                return;
            }
        
            try {
                const response = await fetch('http://localhost:8000/api/report', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': csrfToken,
                        'Accept': 'application/json'
                    },
                    credentials: 'include', // Important for cookies
                    body: JSON.stringify({
                        id_u: userId,
                        id_p: postId,
                        description_r: report,
                    }),
                });
        
                if (response.ok) {
                    setReport(''); // Clear the input field
                    alert('Report added successfully!');
                } else {
                    const errorData = await response.json();
                    console.error(errorData);
                    alert(errorData.error || 'Failed to add report.');
                }
            } catch (err) {
                console.error(err);
                alert('An error occurred. Please try again.');
            }
        }

    const post = useContext(PostsContext);
    return(
        <Dialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <Box className="newPost_window">
                <DialogTitle id="alert-dialog-title">
                  {"Report"}
                </DialogTitle>
                <Divider />
                <DialogContent>
                  <Box className="newpost_text">
                    <TextField
                      id={`report-field-${post.id_p}`}
                      label="what's the problem ?"
                      multiline
                      rows={6}
                      variant="filled"
                      className='text_addpost'
                      value={report}
                      onChange={(e)=>setReport(e.target.value)}
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDialogOpen(false)} className='button_addpost'>Cancel</Button>
                  <Button onClick={() => {handleAddReport();setDialogOpen(false);}} className='button_addpost' autoFocus>
                    Report 
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
    );
}