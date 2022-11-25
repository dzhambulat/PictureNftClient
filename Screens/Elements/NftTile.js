import { Image, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function NftTile({ details, openPressed }) {

    return <TouchableOpacity onPress={openPressed}>
        <Card sx={{
            height: "175px",
            marginTop: "5px",
            marginLeft: "5px",
            marginRight: "5px"
        }}>
            <CardContent style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
                <View style={{ width: "40px" }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {details.nftName}
                    </Typography>
                </View>
                <View style={{ width: "40%" }}>
                    <Image
                        source={details.tokenUri}
                        resizeMode="cover"
                        style={{
                            height: "175px"
                        }}
                    />
                </View>

            </CardContent>
        </Card>
    </TouchableOpacity>
}

NftTile.propTypes = {
    openPressed: PropTypes.func.isRequired
}