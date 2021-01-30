import React from 'react';
import {Dimensions, PixelRatio, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import CircularProgress from './CircularProgress';
import {useValue, interpolateColor} from 'react-native-redash/lib/module/v1';
import Cursor from './Cursor';

const {width} = Dimensions.get('window');
const size = width - 32;
const r = PixelRatio.roundToNearestPixel(size / 2);
const STROKE_WIDTH = 40;

const App = () => {
  const theta = useValue(0);
  const backgroundColor = interpolateColor(theta, {
    inputRange: [0, Math.PI, 2 * Math.PI],
    outputRange: ['#ff3884', '#3884ff', '#38ffb3'],
  });
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <CircularProgress
            strokeWidth={STROKE_WIDTH}
            color={backgroundColor}
            {...{r, theta}}
          />
        </Animated.View>
        <Cursor
          strokeWidth={STROKE_WIDTH}
          r={r - STROKE_WIDTH / 2}
          {...{backgroundColor, theta}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '-90deg'}],
  },
  content: {
    width: r * 2,
    height: r * 2,
  },
});

export default App;
