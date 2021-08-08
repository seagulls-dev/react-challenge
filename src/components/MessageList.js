import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'
import {createUseStyles} from 'react-jss'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import MessageItem from "./MessageItem";

/**
 * @author seagull
 * @type {(data?: {theme?: DefaultTheme}) => Classes<"buttons"|"main"|"snackbar">}
 */
const useStyle = createUseStyles({
    main: {
        flexGrow: 1,
        marginTop : 100
    },
    buttons: {
        textAlign: 'center'
    },
    snackbar : {
        marginTop : 50
    }

});

/**
 * @author seagull
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MessageList = props => {
    const classes = useStyle();
    const [messages, setMessages] = useState([]);           //entire message lists
    const [open, setOpen] = useState(false);                //snack bar state variable

    const [errorList, setErrorList] = useState([]);         //error type 1
    const [warningList, setWarningList] = useState([]);     //warning type 2
    const [infoList, setInfoList] = useState([]);           //info type 3

    //3rd party API
    const [api] = useState(new Api({
        messageCallback: (msg) => {
            messageCallback(msg);
        },
    }))

    //when component is rendered, API started
    useEffect(() => {
        api.start();
    }, [])

    //get random message
    const messageCallback = msg => {
        setOpen(true);
        setMessages(messages => {messages.push(msg);setMessages([...messages])});
        switch (msg.priority) {
            case 1 :
                setErrorList(errorList => {
                    errorList.push(msg);
                    return [...errorList]
                });
                break;
            case 2 :
                setWarningList(warningList => {
                    warningList.push(msg);
                    return [...warningList]
                });
                break;
            case 3 :
                setInfoList(infoList => {
                    infoList.push(msg);
                    return [...infoList]
                });
                break;
        }
    }

    //clear all messages
    const removeAll = () => {
        setWarningList([]);
        setErrorList([]);
        setInfoList([]);
    }

    //start & stop button, clear button
    const renderButton = () => {
        const isApiStarted = api.isStarted()
        return (
            <>
                <Button
                    variant="contained"
                    onClick={() => {
                        if (isApiStarted) {
                            api.stop()
                        } else {
                            api.start()
                        }
                        //force update
                        setMessages([...messages])
                    }}
                    style={{backgroundColor: "#88FCA3"}}
                >
                    {isApiStarted ? 'Stop' : 'Start'}
                </Button>
                <Button style={{backgroundColor: "#88FCA3", marginLeft: 20}} variant="contained" onClick={removeAll}>
                    Clear
                </Button>
            </>

        )
    }

    //clear of each message item card
    const handleRemove = (idx, type) => {
        switch (type) {
            case 1 :
                errorList.splice(idx, 1);
                setErrorList([...errorList]);
                break;
            case 2 :
                warningList.splice(idx, 1);
                setWarningList([...warningList]);
                break;
            case 3 :
                infoList.splice(idx, 1);
                setInfoList([...infoList]);
                break;
        }
        setMessages([...messages])
    }

    //close snack bar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <React.Fragment>
            <Container fixed maxWidth="lg">
                {/*button group*/}
                <div className={classes.buttons}>
                    {renderButton()}
                </div>
                {/*message item card lists*/}
                <div className={classes.main}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <h3>
                                Error Type 1
                            </h3>
                            <p>{errorList?.length}</p>
                            {
                                errorList.map((list, index) => (
                                    <MessageItem content={list.message} type={list.priority} key={index} idx={index}
                                                 removes={(idx) => handleRemove(idx, 1)}/>
                                ))
                            }
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h3>
                                Warning Type 2
                            </h3>
                            <p>{warningList?.length}</p>
                            {
                                warningList.map((list, index) => (
                                    <MessageItem content={list.message} type={list.priority} key={index} idx={index}
                                                 removes={(idx) => handleRemove(idx, 2)}/>
                                ))
                            }
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h3>
                                Info Type 3
                            </h3>
                            <p>{infoList?.length}</p>
                            {
                                infoList.map((list, index) => (
                                    <MessageItem content={list.message} type={list.priority} key={index} idx={index}
                                                 removes={(idx) => handleRemove(idx, 3)}/>
                                ))
                            }
                        </Grid>
                    </Grid>
                </div>
                {/*snack bar*/}
                {
                    messages?.length > 0 &&
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message={messages[messages.length - 1].message}
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                    Clear
                                </IconButton>
                            </React.Fragment>
                        }
                        className={classes.snackbar}
                    />
                }
            </Container>
        </React.Fragment>
    )
}

export default MessageList
