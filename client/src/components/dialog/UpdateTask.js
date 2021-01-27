import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";
import {TaskUpdate} from "../../graphql/useMutation";

export default function UpdateTask(id) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');

    const [task, setTask] = useState('');

    const {data} = useQuery(TaskQuery);
    useEffect(() => {
        if (data) {
            setTask(data.tasks);

        }
    }, [data]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                주문 재작성
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">주문 내용 수정</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        수정하실 주문 내용을 입력해주세요!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        defaultValue={id.title}
                        onChange={e => setContent(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        취소
                    </Button>
                    <Button onClick={TaskUpdate(id, content, setOpen)}
                            disabled={content === '' || content === task.title}
                            color="primary">
                        변경
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
