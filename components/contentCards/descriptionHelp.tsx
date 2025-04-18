import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const DescriptionHelpContent = () => {
  return (
    <View style={styles.container}>
      <Text variant="bodyMedium" style={styles.description}>
        Description is the base ballistic profile metadata
      </Text>

      <View style={styles.item}>
        <Text variant="labelLarge" style={styles.label}>Name</Text>
        <Text variant="bodyMedium" style={styles.text}>
          The name of the ballistic profile as it appears in the device’s "Rifles" menu.
        </Text>
      </View>

      <View style={styles.item}>
        <Text variant="labelLarge" style={styles.label}>Hints</Text>
        <Text variant="bodyMedium" style={styles.text}>
          Short labels for the icon in the device interface.
        </Text>
      </View>

      <View style={styles.item}>
        <Text variant="labelLarge" style={styles.label}>Cartridge</Text>
        <Text variant="bodyMedium" style={styles.text}>
          The name of the projectile as it appears in the device’s "Rifles" menu.
        </Text>
      </View>

      <View style={styles.item}>
        <Text variant="labelLarge" style={styles.label}>Bullet</Text>
        <Text variant="bodyMedium" style={styles.text}>
          The name of the bullet.
        </Text>
      </View>

      <View style={styles.item}>
        <Text variant="labelLarge" style={styles.label}>User Note</Text>
        <Text variant="bodyMedium" style={styles.text}>
          Additional comment.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  description: {
    marginBottom: 20,
  },
  item: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
  },
  text: {
    lineHeight: 20,
    paddingLeft: 16
  },
});

export default DescriptionHelpContent;
