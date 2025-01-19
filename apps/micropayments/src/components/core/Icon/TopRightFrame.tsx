import Svg, { Path } from "react-native-svg";

export interface IconProps {
  size?: string;
  color?: string;
}

export const TopRightFrame = ({
  size = "32",
  color = "#222128",
}: IconProps) => {
  return (
    <Svg width="43" height="42" viewBox="0 0 43 42" fill="none">
      <Path
        d="M2.41992 1.7114C10.8609 1.7114 19.3018 1.7114 27.7428 1.7114C30.2201 1.7114 37.5749 0.326724 38.8409 3.77296C41.2929 10.4479 40.1229 19.3582 40.1465 26.3127C40.1614 30.6877 40.1465 35.063 40.1465 39.438"
        stroke="black"
        stroke-width="4"
        stroke-linecap="round"
      />
    </Svg>
  );
};
