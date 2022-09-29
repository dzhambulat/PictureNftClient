import { StyleSheet, Pressable, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext } from 'react';
import { TextField } from '@mui/material';
import MuiButton from "@mui/material/button";
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { AppContext } from "../context";
import { useEffect } from 'react';
import NftTile from './Elements/NftTile';

const pictureAbi = require("../assets/contract/pictureNft.json");
const Web3 = require('web3');


const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    marginLeft: 25,
    marginTop: 15,
    flexWrap: "wrap"
  },
  button: {
    textAlign: "center",
    backgroundColor: "#fff",
    marginLeft: 3,
    marginRight: 3,
    textDecoration: "bold"
  },
  buttonText: {
    color: "#0a8258"
  }
});

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

export default function Home({ navigation }) {

  let contract;
  const { privateKey, dispatchKeyEvent } = useContext(AppContext);
  const [tokenUri, setTokenUri] = useState("");
  const [isNftEdit, setNftEdit] = useState(false);
  const [nftList, setNftList] = useState(async () => {
    const data = await AsyncStorage.getItem('nftList');
    console.log(data);
    setNftList(data.split(",") || null);
  });

  const [nftPanelProps] = useState({
    style: {
      top: "70%",
      paddingTop: "45px"
    },
    fullWidth: true,
    onlySmall: true,
    showCloseButton: true,
    onClose: () => { setNftEdit(false) },
    onPressCloseButton: () => { setNftEdit(false) }
  });

  AsyncStorage.getItem("privateKey").then((storedPrivateKey) => {
    dispatchKeyEvent("CHANGE_KEY", storedPrivateKey);
    web3.eth.accounts.privateKeyToAccount(privateKey);
    contract = new web3.eth.Contract(pictureAbi.abi, "0xae5f095b94129186498839bcb151d4256Bf9b957");
  });

  React.useLayoutEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <MuiButton onClick={() => setNftEdit(true)} sx={{ color: "#fff", backgroundColor: "#0a8258", marginRight: 1, textDecoration: "bold" }}>+</MuiButton>
      ),
    });
  }, [navigation]);
  //let [tokensTotal, setTotal] = useState(-1)
  /*
  */
  // 

  async function createToken(contract, tokenUri) {
    return contract.methods.createToken(tokenUri).send({ from: privateKey, gas: 6721975 }).catch(() => { return true });
  };

  async function saveNewToken(token) {
    const stgNftList = [...nftList, token];
    setNftList(stgNftList);
    AsyncStorage.setItem("nftList", JSON.stringify(stgNftList));
  }

  return <View>

    <View style={styles.mainView}>
      {nftList.length > 0 ? nftList.map((nftItem, index) => <NftTile key={index} title={"fffff"} openPressed={() => { alert('ssss') }}> </NftTile>) : "f"}
    </View>

    <SwipeablePanel {...nftPanelProps} isActive={isNftEdit} >

      <TextField label="Nft URI" onChange={(event) => { setTokenUri(event.target.value) }} sx={{ m: 3, mt: 5 }} focused />

      <Pressable onPress={(e) => createToken(contract, tokenUri).then(saveNewToken)} style={styles.button}>

        <Text style={styles.buttonText}>MINT</Text>

      </Pressable >

    </SwipeablePanel>

  </View >
}