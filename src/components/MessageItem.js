import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'

/**
 * @author seagull
 * @type {(data?: {theme?: DefaultTheme}) => Classes<"root"|"action">}
 */
const useStyle = createUseStyles({
    root : {
        margin : '1em',
        minHeight : 100,
    },
    action : {
        justifyContent : "flex-end"
    }
})

/**
 * @author seagull
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MessageItem = props => {

    const { content, type, idx, removes } = props;
    const backColors = {
        1 : "#F56236",
        2 : "#FCE788",
        3 : "#88FCA3"
    }
    const classes = useStyle();

    //call parent function via props
    const removeItem = (e, idx) => {
        removes(idx)
    }

    return (
        <Card className={classes.root} style={{backgroundColor : backColors[type]}}>
            <CardContent>
                {content}
            </CardContent>
            <CardActions className={classes.action}>
                <Button size="small" onClick={(e)=>removeItem(e,idx)}>Clear</Button>
            </CardActions>
        </Card>
    )
}

export default MessageItem