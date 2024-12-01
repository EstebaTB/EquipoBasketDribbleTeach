import React from 'react';
import {Image, StyleSheet} from 'react-native';

type sizeProps = {
  width: number;
  height: number;
};

export default function BackgroundLogoImage({
  width,
  height,
}: sizeProps): React.JSX.Element {
  const imageBackgroundLogo = require('../../assets/img/logo.png');
  return (
    <Image
      source={imageBackgroundLogo}
      resizeMode="cover"
      style={[styles.imageBackground, {width, height}]}
    />
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    filter: ' grayscale(80%)',
    position: 'absolute',
  },
});
