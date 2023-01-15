import React from 'react';
import { CustomElasticButton } from 'react-native-micro-animations';
import HeartNormal from '../assets/images/heart-regular.svg';
import HeartSolid from '../assets/images/heart-solid.svg';

interface LikeElasticButtonProps {
  initialColor?: string;
  endColor?: string;
  height?: number;
  width?: number;
  active: boolean;
  onPress?: () => void;
}

export function LikeElasticButton({
  height,
  width,
  initialColor,
  endColor,
  active,
  onPress,
}: LikeElasticButtonProps) {
  return (
    <CustomElasticButton
      initIcon={
        active ? (
          <HeartSolid
            width={width ?? 32}
            height={height ?? 32}
            fill={endColor ?? 'red'}
          />
        ) : (
          <HeartNormal
            width={width ?? 32}
            height={height ?? 32}
            fill={initialColor ?? '#000'}
          />
        )
      }
      endIcon={
        active ? (
          <HeartSolid
            width={width ?? 32}
            height={height ?? 32}
            fill={endColor ?? 'red'}
          />
        ) : (
          <HeartNormal
            width={width ?? 32}
            height={height ?? 32}
            fill={initialColor ?? '#000'}
          />
        )
      }
      onPress={onPress}
    />
  );
}

export default LikeElasticButton;
