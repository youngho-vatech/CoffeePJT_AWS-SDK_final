import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DUpdateUser} from "../../graphql/useMutation";

export default function UpdateUserDialog(username) {
    const [open, setOpen] = useState(false);
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
                유저 정보 수정
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">유저 이름 수정</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {username.username}님의 이름을 변경하시겠습니까?
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="수정하실 이름을 입력해주세요."
                        defaultValue={username.username}
                        onChange={e => setContent(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        취소
                    </Button>
                    <Button disabled={content === '' || content === username.username}
                            onClick={DUpdateUser(username, content, setOpen)} color="primary">
                        변경
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
