import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DSelectUser, DUpdateUser} from "../../graphql/useMutation";

export default function DeleteUserDialog(username) {
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
                유저 삭제
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">유저 이름 수정</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        선택하신 {username.username}님의 이름을 삭제하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        취소
                    </Button>
                    <Button
                            onClick={DSelectUser(username, content, setOpen)} color="primary">
                        삭제
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
