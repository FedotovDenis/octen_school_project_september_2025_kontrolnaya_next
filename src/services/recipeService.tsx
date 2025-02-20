export interface IRecipe {
    id: number;
    name: string;
    description: string;
    tags: string[];
    userId: number;
}

const API_URL = "https://dummyjson.com/products";

export const getRecipes = async (): Promise<IRecipe[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch recipes");
    }
    const data = await response.json();

    const recipes: IRecipe[] = data.products.map((product: any) => ({
        id: product.id,
        name: product.title,
        description: product.description,
        tags: [product.category],
        userId: (product.id % 10) + 1,
    }));
    return recipes;
};

export const getRecipeById = async (id: number): Promise<IRecipe> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch recipe with ID ${id}`);
    }
    const product = await response.json();
    const recipe: IRecipe = {
        id: product.id,
        name: product.title,
        description: product.description,
        tags: [product.category],
        userId: (product.id % 10) + 1,
    };
    return recipe;
};
