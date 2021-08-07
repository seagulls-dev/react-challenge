import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import {colors} from "@material-ui/core";


const useStyle = createUseStyles({
    root : {
        margin : '1em',
        minHeight : 100,
    },
    action : {
        justifyContent : "flex-end"
    }
})

const MessageItem = props => {

    const { content, type, idx, removes } = props;
    const backColors = {
        1 : "#F56236",
        2 : "#FCE788",
        3 : "#88FCA3"
    }
    const classes = useStyle();

    const removeItem = (e, idx) => {
        removes(idx)
    }

    return (
        <Card className={classes.root} style={{backgroundColor : backColors[type]}}>
            <CardContent>
                {content} + {idx}
            </CardContent>
            <CardActions className={classes.action}>
                <Button size="small" onClick={(e)=>removeItem(e,idx)}>Clear</Button>
            </CardActions>
        </Card>
    )

}

export default MessageItem