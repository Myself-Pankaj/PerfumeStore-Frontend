import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../Redux/store';
import ProductCard from './ProductCard';
import Loader from './Loader';

const SearchResult = ({route}) => {
    const { keyword } = route.params;
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
  
    useEffect(() => {
        fetch(`${serverUrl}/get-product?keyword=${keyword}`)
          .then(response => response.json())
          .then(data => {
            // Process and display search results
            setSearchResults(data.products);
            setIsLoading(false); // Data is fetched, set loading to false
          })
          .catch(error => {
            console.error('Error:', error);
            setIsLoading(false); // Error occurred, set loading to false
          });
      }, [keyword]);
    
      // Use setTimeout to set loading to false after 10 seconds
      useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 10000); // 10 seconds in milliseconds
    
        return () => clearTimeout(timer);
      }, []);


  return (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.headerText}>{keyword}</Text>
  {isLoading ? (
    <View style={[styles.loaderContainer, styles.centered]}>
      <Loader />
    </View>
  ) : searchResults.length > 0 ? (
    <View style={styles.productContainer}>
      {searchResults.map((product) => (
        <View key={product._id} style={styles.columnContainer}>
          <ProductCard
            productId={product._id}
            name={product.name}
            avatar={product.images[0].url}
            price={product.price}
            description={product.description}
          />
        </View>
      ))}
    </View>
  ) : (
    <View style={[styles.emptyContainer, styles.centered]}>
      <Text style={styles.emptyText}>No search results found.</Text>
    </View>
  )}
</ScrollView>

  )
}

export default SearchResult

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal:5,
    backgroundColor: 'white', // Set your desired background color
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  columnContainer: {
    width: '48%', // Adjust as needed to fit two columns
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
