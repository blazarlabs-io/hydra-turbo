import Svg, { Path } from "react-native-svg";

export interface IconProps {
  size?: string;
  color?: string;
}

export const BottomRightFrame = ({
  size = "32",
  color = "#222128",
}: IconProps) => {
  return (
    <Svg width="36" height="41" viewBox="0 0 36 41" fill="none">
      <Path
        d="M2.80127 39.5764C7.95517 39.5764 13.1091 39.5764 18.263 39.5764C21.099 39.5764 33.4666 41.7325 33.6903 37.4805C34.3012 25.8747 33.7247 14.0955 33.7247 2.46826"
        stroke="black"
        stroke-width="4"
        stroke-linecap="round"
      />
    </Svg>
  );
};
