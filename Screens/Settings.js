import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useContext } from 'react';;
import { TextField } from '@mui/material';
import MuiButton from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { AppContext } from "../context";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
    const { privateKey, dispatchKeyEvent } = useContext(AppContext);
    const [privateKeyValue, setKeyValue] = useState(privateKey);

    function setPrivateKeyItem() {
        console.log("GHJGHJJ: ", privateKeyValue)
        dispatchKeyEvent("CHANGE_KEY", privateKeyValue);
        AsyncStorage.setItem("privateKey", privateKeyValue);
    }

    return <View>

        <TextField value={privateKeyValue} onChange={(event) => { setKeyValue(event.target.value) }} label="Private key" sx={{ m: 3, mt: 5 }} focused />

        <MuiButton onClick={setPrivateKeyItem} sx={{ color: "#0a8258", backgroundColor: "grey", marginLeft: 3, marginRight: 3 }} >
            SAVE
        </MuiButton>

    </View>
}