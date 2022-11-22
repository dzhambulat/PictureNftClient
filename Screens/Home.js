import { StyleSheet, FlatList, View, Text, Button, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext } from 'react';
import { TextField } from '@mui/material';
import MuiButton from "@mui/material/button";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { AppContext } from "../context";
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

  let contract = new web3.eth.Contract(pictureAbi.abi, "0xB96C4Ca6c450F2Ca4e916d02dD91C525BB483744");

  const { privateKey, dispatchKeyEvent } = useContext(AppContext);
  const [tokenUri, setTokenUri] = useState("");
  const [nftName, setNftName] = useState("");
  const [isNftEdit, setNftEdit] = useState(false);

  const [nftList, setNftList] = useState(async () => {
    const data = await AsyncStorage.getItem('nftList');
    console.log(data);
    setNftList(data.split(",") || null);
  });

  const [nftPanelProps] = useState({
    style: {
      top: "20%",
      paddingTop: "45px"
    },
    fullWidth: true,
    onlySmall: true,
    showCloseButton: true,
    onClose: () => { setNftEdit(false) },
    onPressCloseButton: () => { setNftEdit(false) }
  });

  AsyncStorage.getItem("privateKey").then((storedPrivateKey) => {
    if (!storedPrivateKey) {
      return;
    }
    dispatchKeyEvent("CHANGE_KEY", storedPrivateKey);
    if (privateKey === storedPrivateKey) {
      return;
    }
    web3.eth.accounts.privateKeyToAccount(storedPrivateKey);
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MuiButton onClick={() => setNftEdit(true)} sx={{ color: "#fff", backgroundColor: "#0a8258", marginRight: 1, textDecoration: "bold" }}>+</MuiButton>
      ),
    });
  }, [navigation]);

  async function createToken(contract, tokenUri) {
    console.log(tokenUri);
    return contract.methods.createToken(tokenUri).send({ from: "0x54dCda810Bd3208b7AE32A3294Debbda72fD4980", gas: 6721975 });
  };

  async function saveNewToken({ tokenUri, nftName }) {
    const token = {
      tokenUri, nftName, tokenId
    }
    const stgNftList = [...nftList, token];
    setNftList(stgNftList);
    AsyncStorage.setItem("nftList", JSON.stringify(stgNftList));
  }

  return <View>
    <SafeAreaView>
      <FlatList data={nftList} renderItem={(item) => { <NftTile title={item.nftName} openPressed={() => { alert('ssss') }} keyExtractor={key => key} /> }}>

      </FlatList>
      <View style={styles.mainView}>
        {nftList.length > 0 ? nftList.map((nftItem, index) => <NftTile key={index} title={nftItem.nftName} openPressed={() => { alert('ssss') }}> </NftTile>) : "f"}
      </View>
    </SafeAreaView>

    <SwipeablePanel {...nftPanelProps} isActive={isNftEdit} >

      <TextField label="NFT URI" onChange={(event) => { setTokenUri(event.target.value) }} sx={{ m: 3, mt: 5 }} focused />
      <TextField label="NFT name" onChange={(event) => { setNftName(event.target.value) }} sx={{ m: 3, mt: 5 }} focused />

      <Button onPress={(e) => createToken(contract, tokenUri).then((tokenId) => saveNewToken({ tokenId, tokenUri, nftName })).catch((error) => { console.log(error) })} style={styles.button}>

        <Text style={styles.buttonText}>MINT</Text>

      </Button >

    </SwipeablePanel>

  </View >
}