import React from 'react'
import { StyleSheet, Text, View,Image,Dimensions} from 'react-native'
import Moment from 'moment';

const {width} = Dimensions.get('screen');

const NewsCardLarge = ({data,expandId}) => {
    const {summary,headline,imageUrl,_id,createdAt} = data.item
    const date = Moment(createdAt).format("MMM Do YY, h:mm a");
    return (
        <View
        style={styles.listStyle} >
            {expandId !== _id ? (
                <>
                     <Image source={{uri:imageUrl}} style={styles.imageStyle}/>
                     <View>
                     <Text style={styles.headlineText} numberOfLines={2} ellipsizeMode={'tail'}>{headline}</Text>
                     <Text style={styles.summaryText}  numberOfLines={3}  ellipsizeMode={'tail'}>{summary}
                     </Text>                    
                      </View>
                </>
            ) : (
                <>
                <Image source={{uri:imageUrl}} style={styles.imageStyle}/>
            <View style={styles.infoContainer}>
            <Text style={styles.headlineText}>{headline}</Text>
            <Text style={styles.summaryText} >{summary}
            </Text>
            <Text style={styles.dateText} >{date}
            </Text>
            </View>
            </>
            )}
        </View>
    )
}

export default NewsCardLarge

const styles = StyleSheet.create({
    listStyle:{
        marginTop:10,
        paddingHorizontal:10,
        paddingVertical:10,
        backgroundColor:'rgba(255,255,255,0.7)',
        flexDirection:'row',
        borderRadius:5,
        borderWidth:0.5,
        borderColor:'#dedede',
        justifyContent:'flex-start'
    },
    infoContainer:{
        width:width/2,
    },
    imageStyle:{
        width:width/5 + 10,
        borderRadius:5,
        alignSelf:'center',
        aspectRatio:1,
        marginRight:20,
    },
    headlineText:{
        color:'#000',
        fontWeight:'bold',
        fontSize:14,
        maxWidth:width/2
    },
    summaryText:{
        color:'#000',
        fontSize:12,
        maxWidth:width/2
    },
    dateText:{
        color:'rgb(65,85,179)',
        fontSize:11,
        alignSelf:'flex-end',
        marginTop:5
    }

})
