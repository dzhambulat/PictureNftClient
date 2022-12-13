import { StyleSheet, FlatList, View, Text, TextInput, Button, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext } from 'react';
import { TextField } from '@mui/material';
import MuiButton from "@mui/material/button";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { AppContext } from "../../context";
import NftTile from './NftTile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const pictureAbi = require("../../assets/contract/pictureNft.json");
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
    },
    flatList: {
        flex: 1,
        marginLeft: "5px",
        marginRight: "5px"
    },
});

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

export default function NftList({ navigation }) {

    let contract = new web3.eth.Contract(pictureAbi.abi, "0xB96C4Ca6c450F2Ca4e916d02dD91C525BB483744");

    const { privateKey, dispatchKeyEvent } = useContext(AppContext);
    const [tokenUri, setTokenUri] = useState("");
    const [nftName, setNftName] = useState("");
    const [isNftEdit, setNftEdit] = useState(false);

    const [nftList, setNftList] = useState(async () => {
        let data = await AsyncStorage.getItem('nftList');
        if (!data) {
            data = [
                {
                    tokenUri: "https://cdn.100sp.ru/pictures/525190627",
                    nftName: "First NFT",
                    tokenId: 1

                }, {
                    tokenUri: "",
                    nftName: "Lands",
                    tokenId: 2

                }, {
                    tokenUri: "",
                    nftName: "Jojo",
                    tokenId: 3

                }, {
                    tokenUri: "",
                    nftName: "Cups",
                    tokenId: 4

                }, {
                    tokenUri: "",
                    nftName: "Sport bike",
                    tokenId: 5

                }, {
                    tokenUri: "",
                    nftName: "FIFA",
                    tokenId: 6

                }
            ]
        }
        console.log(data);
        setNftList(data || null);
        setCurrentNftList(data || null)
        //setNftList(data.split(",") || null);
    });

    const [currentNftList, setCurrentNftList] = useState([]);

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

    async function onFilterNft(text) {
        if (!text.length) {
            setCurrentNftList(nftList);
            return;
        }

        const result = nftList.filter((nft) => nft.nftName.includes(text))
        setCurrentNftList(result);
    }

    async function saveNewToken({ tokenUri, nftName, tokenId }) {
        const token = {
            tokenUri, nftName, tokenId
        }
        const stgNftList = [...nftList, token];
        setNftList(stgNftList);
        AsyncStorage.setItem("nftList", JSON.stringify(stgNftList));
    }

    return <View>
        <SafeAreaView style={{
            marginTop: "20px",
            flex: 1,
            flexDirection: "column"
        }}>
            <View style={{ marginLeft: "5px", flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <TextInput style={{
                    height: "40px",
                    width: "70%",
                    backgroundColor: "grey",
                    borderRadius: "5px",
                    paddingLeft: 10,
                }} placeholder="Search NFT" onChangeText={onFilterNft}></TextInput>
                <View style={{ width: "40px", height: "40px", marginRight: "5px", borderRadius: "50%" }}>
                    <TouchableOpacity onPress={() => setNftEdit(true)}>
                        <Ionicons name="add-circle-outline" color="#0a8258" style={{ fontSize: "40px" }} />
                    </TouchableOpacity>
                </View>


            </View>

            <FlatList styles={styles.flatList} data={currentNftList} renderItem={(dataItem) => <NftTile details={dataItem.item} openPressed={() => { navigation.navigate("NftDetails", { details: dataItem.item }) }} />} keyExtractor={item => item.tokenId}>
            </FlatList>
        </SafeAreaView >

        <SwipeablePanel {...nftPanelProps} isActive={isNftEdit} >

            <TextField label="NFT URI" onChange={(event) => { setTokenUri(event.target.value) }} sx={{ m: 3, mt: 5 }} focused />
            <TextField label="NFT name" onChange={(event) => { setNftName(event.target.value) }} sx={{ m: 3, mt: 5 }} focused />

            <Button onPress={(e) => createToken(contract, tokenUri).then((tokenId) => saveNewToken({ tokenId, tokenUri, nftName })).catch((error) => { console.log(error) })} style={styles.button}>

                <Text style={styles.buttonText}>MINT</Text>

            </Button >

        </SwipeablePanel>

    </View >
}