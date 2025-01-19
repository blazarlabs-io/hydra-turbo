import Svg, { Path } from "react-native-svg";

export interface IconProps {
  size?: string;
  color?: string;
}

export const BottomLeftFrame = ({
  size = "32",
  color = "#222128",
}: IconProps) => {
  return (
    <Svg width="51" height="48" viewBox="0 0 51 48" fill="none">
      <Path
        d="M2.77954 2.04663C3.69175 15.1597 2.80363 29.1392 5.9406 41.9722C7.11787 46.7883 15.5049 44.7105 19.2033 44.721C26.7376 44.7424 34.2483 44.3014 41.6743 45.683C43.9362 46.1038 46.2562 45.9579 48.5462 45.9579"
        stroke="black"
        stroke-width="4"
        stroke-linecap="round"
      />
    </Svg>
  );
};
