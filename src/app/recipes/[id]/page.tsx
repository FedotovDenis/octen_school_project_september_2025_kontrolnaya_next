import { getRecipeById } from "@/services/recipeService";
import Link from "next/link";

const RecipeDetailPage = async ({ params }: { params: { id: string } }) => {
    const recipe = await getRecipeById(Number(params.id));

    return (
        <div>
            <h1>{recipe.name}</h1>
            <p>
                <strong>Описание:</strong> {recipe.description}
            </p>
            <p>
                <strong>Теги:</strong> {recipe.tags.join(", ")}
            </p>
            <Link href={`/users/${recipe.userId}`}>Подробнее об авторе</Link>
        </div>
    );
};

export default RecipeDetailPage;
