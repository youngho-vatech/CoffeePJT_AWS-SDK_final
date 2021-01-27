import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DUpdateUser, UserAdd} from "../../graphql/useMutation";

export default function UserAddButton(username) {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                유저 추가
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">유저 추가</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        추가하실 이름을 입력해주세요!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="email"
                        onChange={e => setContent(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        취소
                    </Button>
                    <Button onClick={UserAdd(username, content, setOpen)} color="primary">
                        추가
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
