import { Pressable } from 'react-native';
import React from 'react';;
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function NftTile({ title, openPressed }) {


    return <Card sx={{
        height: "175px",
        minWidth: "75px",
        width: "40%",
        marginLeft: "5px",
        marginTop: "15px"
    }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {title}
            </Typography>
        </CardContent>
        <CardActions>
            <Pressable size="small" onPress={openPressed} >Learn More</Pressable>
        </CardActions>
    </Card>
}

NftTile.PropTypes = {
    openPressed: PropTypes.func.isRequired
}