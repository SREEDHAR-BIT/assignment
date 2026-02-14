import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}


const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://fakestoreapi.com/products'
      );
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'https://fakestoreapi.com/products/categories'
      );
      const data = await response.json();
      setCategories(['all', ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchByCategory = async (category: string) => {
    try {
      setLoading(true);

      if (category === 'all') {
        fetchProducts();
        return;
      }

      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

return (
  <LinearGradient
    colors={['#1E3A8A', '#3B82F6']}
    style={{ flex: 1 }}
  >
    <View style={styles.container}>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={styles.categoryBtn}
            onPress={() => fetchByCategory(cat)}
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />

              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>

              <Text style={styles.price}>${item.price}</Text>

              <Text style={styles.categoryTextSmall}>
                {item.category}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  </LinearGradient>
)
}

export default Home;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    backgroundColor: 'transparent', 
  },

  categoryBtn: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    marginRight: wp(3),
    borderRadius: wp(10),
    elevation: 2,
  },

  categoryText: {
    fontWeight: '500',
    color: '#1E3A8A',
    fontSize: hp(1.8),
    textTransform: 'capitalize',
    height: hp(3),
    textAlign: 'center',
    justifyContent: 'center',
  },

  card: {
    marginVertical: hp(1.2),
    padding: wp(4),
    borderRadius: wp(4),
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: wp(2),
    shadowOffset: { width: 0, height: hp(0.5) },
  },

  image: {
    width: '100%',
    height: hp(22),
    resizeMode: 'contain',
    backgroundColor: '#F1F5F9',
    borderRadius: wp(3),
    marginBottom: hp(1),
  },

  title: {
    fontWeight: '600',
    fontSize: hp(2),
    color: '#0F172A',
    marginBottom: hp(0.5),
  },

  price: {
    color: '#16A34A',
    fontWeight: '600',
    fontSize: hp(2.2),
    marginBottom: hp(0.5),
  },

  categoryTextSmall: {
    fontSize: hp(1.5),
    color: '#64748B',
    textTransform: 'capitalize',
  },
})

