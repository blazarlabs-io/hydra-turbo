import Svg, { Path } from "react-native-svg";

export interface IconProps {
  size?: string;
  color?: string;
}

export const TopLeftFrame = ({ size = "32", color = "#222128" }: IconProps) => {
  return (
    <Svg width="47" height="43" viewBox="0 0 47 43" fill="none">
      <Path
        d="M2.59497 40.0564C2.64789 30.002 3.08478 20.0524 3.69447 10.0264C3.95778 5.69641 2.39324 0.33686 8.16119 0.130862C20.2542 -0.30103 32.5309 0.474456 44.6508 0.474456"
        stroke="black"
        stroke-width="4"
        stroke-linecap="round"
      />
    </Svg>
  );
};
