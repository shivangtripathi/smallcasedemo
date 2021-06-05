import React,{useState} from 'react'
import { StyleSheet, Text, View,Image ,Dimensions} from 'react-native'
import Moment from 'moment';
const {height,width} = Dimensions.get('screen');

const NewsCardSmall = ({item}) => {
    const date = Moment(item.item.createdAt).format("MMM Do YY, h:mm a");

    return (
        <View style={{flexDirection:'column',marginTop:10,borderRadius:5,marginLeft:10}}>
        <Image
                    source={{ uri: item.item.imageUrl }}
                    style={styles.image}
                />
        <View style={{backgroundColor:'rgba(0,0,0,0.4)',paddingVertical:5}}>
            <Text style={{color:'#fff',fontSize:12,alignSelf:'center'}}>{date}</Text>
        </View> 
    </View>
    )
}

export default NewsCardSmall

const styles = StyleSheet.create({
    image:{
        width:width/2 - 20,
        height:100
    },
})
