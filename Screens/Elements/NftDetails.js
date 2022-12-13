import { StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
function NftDetails({ navigation, route }) {
    const nftInfo = route.params.details;
    return (
        <SafeAreaView style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "start" }}>
            <View style={{ marginTop: "20px", width: "100%", height: "40px", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }}>

                <View styles={{ width: "40px" }}>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <Ionicons styles={{ marginLeft: "20px", height: "40px", width: "40px" }} name="arrow-back-outline" color="#0a8258" />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{ flex: 1 }}>
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
                    {nftInfo.nftName}
                </Text>
            </View>

        </SafeAreaView>
    )
}

export default NftDetails