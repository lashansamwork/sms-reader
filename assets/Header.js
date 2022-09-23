import React from "react";
import { View, Image } from "react-native";

const Header = () =>{
    return(
        <View style={{flex: 1}}>
            <Image style={{alignSelf: "center" }}
             source={require("../assets/imgs/nmb-wakala.png")}
            />
        </View>
    );
}


export default Header;