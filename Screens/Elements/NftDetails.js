import { StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
function NftDetails({ navigation, route }) {
    const nftInfo = route.params.details;
    return (
        <SafeAreaView style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "start" }}>
            <View style={{ zIndex: 5, position: "absolute", left: "20px", top: "20px" }}>
                <View>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <Ionicons style={{ fontSize: "40px", opacity: "0.7" }} name="arrow-back-circle-outline" color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1, width: "100%" }}>
                <Image
                    source={nftInfo.tokenUri}
                    resizeMode="cover"
                    style={{
                        height: "300px",
                        width: "100%"
                    }}
                />
                <View style={{ padding: "5px", marginTop: "10px", marginLeft: "5px", marginRight: "5px", backgroundColor: "white", borderRadius: "5px" }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomColor: "#0a8258", borderBottomWidth: "1px" }}>
                        <Text style={{ color: "#0a8258" }}>NFT label</Text>
                        <Text style={{ color: "black" }}>
                            {nftInfo.nftName}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "#0a8258" }}>NFT URI</Text>
                        <Text style={{ color: "black" }}>
                            {nftInfo.tokenUri}
                        </Text>
                    </View>

                </View>

            </View>

        </SafeAreaView>
    )
}

export default NftDetails