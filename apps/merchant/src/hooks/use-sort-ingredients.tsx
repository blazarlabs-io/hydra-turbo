import { Ingredient, Wine } from "@/types/db";
import { useEffect, useState } from "react";

export const useSortIngredients = (wine: Wine, allergens: string[]) => {
  const [acidityRegulators, setAcidityRegulators] = useState<
    Ingredient[] | null
  >(null);
  const [stabilizers, setStabilizers] = useState<Ingredient[] | null>(null);
  const [finingAgents, setFiningAgents] = useState<Ingredient[] | null>(null);
  const [antioxidants, setAntioxidants] = useState<Ingredient[] | null>(null);

  const checkAllergens = (
    allergens: string[],
    ingredients: Ingredient[],
  ): Ingredient[] => {
    const allergenSet = new Set(allergens.map((a) => a.toLowerCase())); // Normalize allergens to lowercase
    return ingredients.map((ingredient) => ({
      ...ingredient,
      isAllergen: allergenSet.has(ingredient.name.toLowerCase()), // Check case-insensitively
    }));
  };

  useEffect(() => {
    if (wine) {
      setAcidityRegulators(
        checkAllergens(
          allergens,
          wine.ingredients.acidityRegulators as Ingredient[],
        ),
      );
      setStabilizers(
        checkAllergens(allergens, wine.ingredients.stabilizers as Ingredient[]),
      );
      setFiningAgents(
        checkAllergens(
          allergens,
          wine.ingredients.finingAgents as Ingredient[],
        ),
      );
      setAntioxidants(
        checkAllergens(
          allergens,
          wine.ingredients.antioxidants as Ingredient[],
        ),
      );
    }
  }, [wine, allergens]);

  return {
    acidityRegulators,
    stabilizers,
    finingAgents,
    antioxidants,
  };
};
