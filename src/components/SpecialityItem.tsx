import { SpecialityItem as SpecialityItemProps } from "../types"; 
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  specialityItem: SpecialityItemProps; 
  addToCart: () => void;
};

const SpecialityItemComponent = ({ specialityItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{specialityItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ksh{(specialityItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default SpecialityItemComponent; 
