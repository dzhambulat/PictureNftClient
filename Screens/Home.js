import { StyleSheet, Pressable, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext } from 'react';
import { TextField } from '@mui/material';
import MuiButton from "@mui/material/button";
import Card from "@mui/material/Card"
import { SwipeablePanel } from 'rn-swipeable-panel';
import { AppContext } from "../context";
import { useEffect } from 'react';

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

export default function Home({ navigation }) {
  async function createToken(contract, tokenUri) {
    return Promise.resolve({})
    //  return contract.methods.createToken(tokenUri).send({ from: "0xD8294863573c8E57D496AF0918c37aA801df834f", gas: 6721975 }).catch(() => { return true });
  }
  const [tokenUri, setTokenUri] = useState("");

  const [isNftEdit, setNftEdit] = useState(false);
  const { privateKey, dispatchKeyEvent } = useContext(AppContext);

  AsyncStorage.getItem('privateKey').then((privateKey) => {
    dispatchKeyEvent("CHANGE_KEY", privateKey)
  });

  const [nftList, setNftList] = useState(async () => {
    const data = await AsyncStorage.getItem('nftList') //get data and store them in constat
    console.log(data);
    setNftList(data.split(",") || null);
  })

  const [nftPanelProps, setNftPanelProps] = useState({
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

  React.useLayoutEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <MuiButton onClick={() => setNftEdit(true)} sx={{ color: "#fff", backgroundColor: "#0a8258", marginRight: 1, textDecoration: "bold" }}>+</MuiButton>
      ),
    });
  }, [navigation]);
  //let [tokensTotal, setTotal] = useState(-1)
  /*const web3 = new Web3(
    new Web3.providers.HttpProvider('http://localhost:7545')
  );
  web3.eth.accounts.privateKeyToAccount(privateKey);*/
  // const contract = new web3.eth.Contract(pictureAbi.abi, "0xae5f095b94129186498839bcb151d4256Bf9b957");

  return <View>
    <View style={styles.mainView}>
      {nftList.length > 0 ? nftList.map((nftItem, index) => <Card key={index}
        variant="outlined"
        sx={{
          height: "75px",
          minWidth: "75px",
          width: "45%",
          marginLeft: "5px"
        }}
      >sddssd</Card>) : "f"}
    </View>

    <SwipeablePanel {...nftPanelProps} isActive={isNftEdit} >
      <TextField label="Nft URI" onChange={(event) => { setTokenUri(event.target.value) }} sx={{ m: 3, mt: 5 }} focused />
      <Pressable onPress={(e) => createToken(undefined, tokenUri).then((t) => {
        const stgNftList = [...nftList, t];
        setNftList(stgNftList);
        AsyncStorage.setItem("nftList", JSON.stringify(stgNftList));
      })} style={styles.button}>
        <Text style={styles.buttonText}>MINT</Text>
      </Pressable >
    </SwipeablePanel>
  </View >
}