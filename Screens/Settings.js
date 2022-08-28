import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useContext } from 'react';;
import { TextField } from '@mui/material';
import MuiButton from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { AppContext } from "../context";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
    const [key, setKeyValue] = useState(async () => {
        const data = await AsyncStorage.getItem('privateKey') //get data and store them in constat
        setKeyValue(data || null);
    });
    const { privateKey, dispatchKeyEvent } = useContext(AppContext);

    return <View>
        <TextField value={key} onChange={(event) => { setKeyValue(event.target.value) }} label="Private key" sx={{ m: 3, mt: 5 }} focused />
        <MuiButton onClick={() => {
            dispatchKeyEvent("CHANGE_KEY", key);
            AsyncStorage.setItem("privateKey", key);
        }} sx={{ color: "#0a8258", backgroundColor: "grey", marginLeft: 3, marginRight: 3 }} >
            SAVE
        </MuiButton>
    </View>
}