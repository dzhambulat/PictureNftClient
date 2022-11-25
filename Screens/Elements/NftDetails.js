import { StyleSheet, Text, Image, Button, SafeAreaView } from 'react-native';
function NftDetails({ navigation, route }) {
    const nftInfo = route.params.details;
    return (
        <SafeAreaView style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
            <Image
                source={nftInfo.tokenUri}
                resizeMode="cover"
                style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                    marginTop: "15px"
                }}
            />
            <Text>
                nftInfo.nftName
            </Text>
        </SafeAreaView>
    )
}

export default NftDetails