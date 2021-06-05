import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,FlatList,SafeAreaView, TouchableOpacity, ActivityIndicator, Switch } from 'react-native'
import NewsCardLarge from '../components/news-card-large';
import NewsCardSmall from '../components/news-card-small';

const HomeScreen = () => {
    const [news,setNews] = useState(undefined);
    // const [listIndex,setListIndex] = useState(0);
    // const [gridIndex,setGridIndex] = useState(0);
    const [loading,setLoading] = useState(true);
    const [offset,setOffset] = useState(0);
    const [gridDisplay,setgridDisplay] = useState(false);
    const [expandId,setExpandId] = useState(-1);

    

    useEffect(()=>{
        fetch('https://api.smallcase.com/news/getNews?count=20&offset=0').then((res)=>res.json()).then((json)=>{
        setOffset(offset+20);
        setNews(json.data)
        setLoading(false);
    });
    },[])
    
    const fetchMoreData = () =>{
        fetch(`https://api.smallcase.com/news/getNews?count=20&offset=${offset}`).then((res)=>res.json()).then((json)=>{
        setOffset(offset+20);
        setNews([...news,...json.data]);
        })
    }

    // const gridItemChanged = useRef(({viewableItems})=>{
    //     setGridIndex(viewableItems[0].index)
    // }).current;
    // const listItemChanged = useRef(({viewableItems})=>{
    //     setListIndex(viewableItems[0].index)
    // }).current;

    // const viewConfig = useRef({viewAreaCoveragePercentThreshold:100}).current;

    const renderNews=()=>{
        if(gridDisplay)
        {
            return(
                <FlatList 
                data={news}
                bounces={false}
                scrollEventThrottle={32}
               // initialScrollIndex={gridIndex}
              //  onViewableItemsChanged={gridItemChanged}
              //  viewabilityConfig={viewConfig}
                key={item=>item._id+'-'+2}
                numColumns={2}
                style={{marginHorizontal:10}}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                onEndReached={()=>fetchMoreData()}
                onEndReachedThreshold={0.6}
                renderItem={(item)=> {return(
                    <NewsCardSmall item={item}/>
                )} }
                />
            )
        }
        else{
            return(
                <FlatList 
                data={news}
                bounces={false}
                scrollEventThrottle={32}
                //initialScrollIndex={listIndex}
               // onViewableItemsChanged={listItemChanged}
               // viewabilityConfig={viewConfig}
                style={{paddingHorizontal:20}}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                onEndReached={()=>fetchMoreData()}
                onEndReachedThreshold={0.6}
                renderItem={(item)=> {return(
                    <TouchableOpacity
                    activeOpacity={0.9}
                    key={item._id} 
                    onPress={()=>  handleClick(item.item._id)}>
                        <NewsCardLarge data={item} expandId={expandId}/>
                    </TouchableOpacity>
                )} }
                />
            )
        }
    }
    const handleClick = (id) =>{
        if(id === expandId) 
        {
            setExpandId(-1);
        }
        else{
            setExpandId(id);
        }
        
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainView}>
            <View style={styles.header}>
            <Text style={styles.title}>
             Let's Get Updated.
            </Text>
            <Text style={[styles.title,{fontSize:14}]}>
                Toogle Views
            </Text>
            <View style={styles.switchContainer}>
            <Text style={styles.labelHeader}>
                Comfortable
            </Text>
            <Switch
            style={styles.switch}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={gridDisplay ? "#28306a" : "#f4f3f4"}
              onValueChange={()=>setgridDisplay(!gridDisplay)}
              value={gridDisplay}
             />
             <Text style={styles.labelHeader}>
                Compact
            </Text>
            </View>
            </View>
            {loading ? (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator color="#ff00ff" size={'large'}/>
            </View>):(renderNews())}
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    mainView:{
        flex:1,
        backgroundColor:'#fff'
    },
    header:{
        paddingBottom:10,
        borderWidth:0.8,
        borderColor:'#4155b3',
        backgroundColor:'rgba(65,85,179,0.4)'
    },
    title:{
        marginTop:20,
        fontSize:18,
        fontWeight:'bold',
        marginLeft:20,
        color:"#000",
        letterSpacing:0.5
    },
    labelHeader:{
        fontSize:12,
        marginTop:10,
        fontWeight:'bold',
        marginLeft:20,
        color:"#000",
    },
    activityIndicatorContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#dedede'
    },
    switch:{
        alignItems:'center',
        marginLeft:10
    },
    switchContainer:{
        flexDirection:'row',
        height:40
    }
})
