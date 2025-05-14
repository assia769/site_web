import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useContext, useState, useEffect } from 'react';
import { PostsContext } from './context/PostsContext';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function Repport({ dialogOpen, setDialogOpen, userId, postId, onReportSuccess, onReportError }) {
    const [report, setReport] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/sanctum/csrf-cookie', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];
                
            if (token) {
                setCsrfToken(decodeURIComponent(token));
            }
        })
        .catch(error => {
            console.error('Error fetching CSRF token:', error);
            onReportError('Failed to initialize report form');
        });
    }, [onReportError]);

    const handleAddReport = async () => {
        if (!report.trim()) {
            onReportError('Please enter the description of your report');
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
                credentials: 'include',
                body: JSON.stringify({
                    id_u: userId,
                    id_p: postId,
                    description_r: report,
                }),
            });
    
            if (response.ok) {
                setReport(''); // Clear the input field
                onReportSuccess();
                setDialogOpen(false);
            } else {
                const errorData = await response.json();
                console.error(errorData);
                onReportError(errorData.error || 'Failed to add report');
            }
        } catch (err) {
            console.error(err);
            onReportError('An error occurred. Please try again');
        }
    }

    const post = useContext(PostsContext);
    return (
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
                            onChange={(e) => setReport(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} className='button_addpost'>
                        Cancel
                    </Button>
                    <Button onClick={handleAddReport} className='button_addpost' autoFocus>
                        Report 
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}