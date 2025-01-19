import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export interface IconProps {
  size?: string;
  color?: string;
}

export const Plus = ({ size = "16", color = "#222128" }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M12.6667 9.16537H8.66671V13.1654H7.33337V9.16537H3.33337V7.83203H7.33337V3.83203H8.66671V7.83203H12.6667V9.16537Z"
        fill={color}
      />
    </Svg>
  );
};
