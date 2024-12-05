import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface StarRatingProps {
  rating: number; // Valoración de 0 a 10.
  maxRating?: number; // Máximo número de estrellas (opcional, por defecto 10).
}

export default function StarRating({ rating, maxRating = 10 }: StarRatingProps): React.JSX.Element {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      {/* Estrellas completas */}
      {[...Array(fullStars)].map((_, index) => (
        <Text key={`full-${index}`} style={styles.starFull}>
          ★
        </Text>
      ))}

      {/* Media estrella */}
      {halfStar && <Text style={styles.starHalf}>★</Text>}

      {/* Estrellas vacías */}
      {[...Array(emptyStars)].map((_, index) => (
        <Text key={`empty-${index}`} style={styles.starEmpty}>
          ★
        </Text>
      ))}

      {/* Texto opcional para mostrar el valor */}
      <Text style={styles.ratingText}> {rating.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  starFull: {
    color: '#223854', 
    fontSize: 30,
    marginHorizontal: 1,
  },
  starHalf: {
    color: '#223854',
    fontSize: 30,
    marginHorizontal: 2,
    opacity: 0.5, // Simula media estrella.
  },
  starEmpty: {
    color: '#9f8564', 
    fontSize: 30,
    marginHorizontal: 2,

  },
  ratingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 2,
  },
});
