import React from 'react';
import {StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  add,
  cond,
  lessThan,
  proc,
  set,
  useCode,
} from 'react-native-reanimated';
import {
  usePanGestureHandler,
  withOffset,
  canvas2Polar,
  polar2Canvas,
} from 'react-native-redash/lib/module/v1';

interface CursorProps {
  strokeWidth: number;
  backgroundColor: any;
  theta: Animated.Value<number>;
  r: number;
}

interface ContainerParam {
  translateX: number;
  translateY;
}

const normalizeTheta = proc((theta: Animated.Node<number>) =>
  cond(lessThan(theta, 0), add(Math.PI * 2, theta), theta),
);

const Cursor = ({strokeWidth, backgroundColor, r, theta}: CursorProps) => {
  const center = {x: r, y: r};
  const {gestureHandler, translation, state} = usePanGestureHandler();
  const x = withOffset(translation.x, state);
  const y = withOffset(translation.y, state);
  const polar = canvas2Polar({x, y}, center);
  useCode(() => [set(theta, normalizeTheta(polar.theta))], [
    center,
    theta,
    x,
    y,
  ]);
  const {x: translateX, y: translateY} = polar2Canvas(
    {theta: polar.theta, radius: r},
    center,
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={styles.container({
          backgroundColor,
          strokeWidth,
          translateX,
          translateY,
        })}
      />
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create<any>({
  container: ({
    backgroundColor,
    strokeWidth,
    translateX,
    translateY,
  }: CursorProps & ContainerParam) => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor,
    width: strokeWidth,
    height: strokeWidth,
    borderRadius: strokeWidth / 2,
    borderColor: 'white',
    transform: [{translateX}, {translateY}],
    borderWidth: 5,
  }),
});

export default Cursor;
