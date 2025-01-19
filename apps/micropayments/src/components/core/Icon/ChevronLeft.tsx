import Svg, { Path } from "react-native-svg";

export interface IconProps {
  size?: string;
  color?: string;
}

export const ChevronLeft = ({ size = "32", color = "#222128" }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill={color} d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z" />
    </Svg>
  );
};
