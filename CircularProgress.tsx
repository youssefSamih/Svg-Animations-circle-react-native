import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {multiply} from 'react-native-reanimated';
import Svg, {Circle} from 'react-native-svg';

interface CircularProgressProps {
  r: number;
  strokeWidth: number;
  color: Animated.Node<number>;
  theta: Animated.Value<number>;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({
  r,
  strokeWidth,
  color,
  theta,
}: CircularProgressProps) => {
  const radius = r - strokeWidth / 2;
  const strokeDashoffset = multiply(theta, radius);
  const circumferenece = radius * 2 * Math.PI;
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Circle
        cx={r}
        cy={r}
        fill="transparent"
        stroke="white"
        r={radius}
        {...{strokeWidth}}
      />
      <AnimatedCircle
        fill="transparent"
        cx={r}
        cy={r}
        r={radius}
        stroke={(color as unknown) as number}
        strokeDashArray={`${circumferenece}, ${circumferenece}`}
        {...{strokeWidth, strokeDashoffset}}
      />
    </Svg>
  );
};

export default CircularProgress;
