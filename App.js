import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput,Image,
  TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

export default function App() {

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const response = await fetch('http://retailsapi.us-east-2.elasticbeanstalk.com/api/feedapp/getfeed',
      {
        method: 'GET'
      });

    const data = await response.json();
    setFeedData(data.products);
    setIsLoading(false);
  }
  const changeViewState = () => {
    const isVisible = isFormVisible;
    if (isVisible) {
      setIsFormVisible(false);
    } else {
      setIsFormVisible(true);
    }
  }


  const addNewProduct = async() => {

    const publisherUser = { 
      name: 'shilat apel', 
      id: '20560838', 
      email: 'shilat199@gmail.com', 
      mobile:'0527793084' };
    //Check if state variables are not empty
    const response = await fetch('http://retailsapi.us-east-2.elasticbeanstalk.com/api/feedapp/addfeed',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productName: productName,
          productPrice: productPrice,
          productImage: productImage,
          publisher: publisherUser
        })
      });
      const data = await response.json();
      console.log(data);
  }


  return (
    <View style={styles.container}>

      {
        isFormVisible ?
          (
            <View style={styles.mainView}>
              <View style={{ width: '100%', height: 20,flex: 1 ,marginTop:80,alignItems: 'center',flexDirection:'column'}}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#892b64",}}>Add New Product</Text>
              
              <TextInput style={{width:'100%', height:40, backgroundColor:'#ebebeb',fontSize:25,textAlign:'center',marginTop:100,backgroundColor:'#fdffb6'}} placeholder=" Product Name" value={productName} autoCapitalize='words' onChangeText={text => setProductName(text)}  />
              <TextInput style={{ width: '100%', height: 40, backgroundColor: '#ebebeb',fontSize:25,textAlign:'center',marginTop:30,backgroundColor:'#fdffb6' }} placeholder=" Product Price" value={productPrice} keyboardType="numeric" onChangeText={text => setProductPrice(text)} />
              <TextInput style={{width:'100%', height:40, backgroundColor:'#ebebeb',fontSize:25,textAlign:'center',marginTop:30,backgroundColor:'#fdffb6'}} placeholder=" Product Image" value={productImage} onChangeText={text => setProductImage(text)}  />
              </View>
              <TouchableOpacity style={styles.addBtn} onPress={addNewProduct}><Text style={{fontSize:25,color:'#892b64',textAlign:'center'}}>Add</Text></TouchableOpacity>

            </View>
          )
          :
          (
            <View style={styles.mainView}>
              {
                isLoading ?
                  (
                    <ActivityIndicator size='large' color='#99cc00' />
                  ) :
                  (
                    <View style={{ width: '100%' }}>
                     <View style={styles.title}>
                       <Text style={styles.title_container}>Varda&Shilat Store</Text>
                     </View>
                     {
                      feedData.length > 0 ?
                        (
                          <FlatList
                            data={feedData}
                            keyExtractor={item => item._id}
                            renderItem={itemData =>
                                <View>
                            
                                <View style={{ height: 100, marginTop:5, width: '100%', flexDirection: 'row',padding:1,marginTop: 10,}}>
                                  
                                 <View style={styles.row_container}>
                                      <View style={ {width:'30%'}}>
                                      <Image style={styles.image_container} source={{ uri: itemData.item.productImage }} />
                                  </View>
                                  <View style={styles.content_container}>
                                        <Text style={{ fontWeight: "bold",fontSize: 18, width: '75%' }}>{itemData.item.productName}</Text>
                                   </View>
                                    <View style={styles.price_container}>
                                      <Text style={{ fontWeight: "bold",fontSize: 16 }}>{itemData.item.productPrice}$</Text>
                                    </View>
                                 </View>
                                </View> 
                              </View>
                              }
                            />
                          ) :
                          (
                            <Text>No Data</Text>
                          )
                      }
                    </View>
                  )
              }
            </View>
          )
      }

      <View style={styles.menuView}>
        <TouchableOpacity onPress={changeViewState} style={styles.feedBtn}><Text style={styles.btnText}>Feed</Text></TouchableOpacity>
        <TouchableOpacity onPress={changeViewState} style={styles.addButton}><Text style={styles.btnText}>Add New</Text></TouchableOpacity>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  feedBtn: { width: '50%', backgroundColor: '#761954', alignItems: 'center', justifyContent: 'center' },
  addButton: { width: '50%', backgroundColor: '#e1c13b', alignItems: 'center', justifyContent: 'center' },
  mainView: { height: '90%', width:'100%', alignItems: 'center', justifyContent: 'center', flex:1 },
  btnText: { color: '#ffffff', fontSize: 20 },
  menuView: { height: '10%', flexDirection: 'row', justifyContent: 'space-between' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  row_container: {
    borderWidth: 2,
    borderColor:"#4b4848",
    width: "100%",
    marginTop: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  price_container: {
    width: "20%",
    backgroundColor: "#763550",
    alignItems: "center",
    justifyContent: "center",
    
  },
  content_container: {
    backgroundColor: "#737373",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",

  },
  title:{
    width: "100%",
    height: "16%",
    backgroundColor: "#ead375",
    alignItems: "center",
justifyContent: "center",
    marginTop:60,
    padding: 30,
  },
  image_container: { width: "100%", height: 88, },
  title_container: { color: "#892b64", fontSize: 32, fontStyle: "italic", fontWeight: "bold", marginTop: 20, },
  addBtn: {alignItems: "center",backgroundColor: "#ead375",padding: 10, width:'10%',height:65,paddingTop:20,marginBottom:35},

});
