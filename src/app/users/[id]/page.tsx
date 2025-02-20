import { getUserById } from "@/services/userService";
import { getRecipes } from "@/services/recipeService";
import Link from "next/link";
import { IUser } from "@/services/userService";
import { IRecipe } from "@/services/recipeService";

const UserDetailPage = async ({ params }: { params: { id: string } }) => {
    const user: IUser = await getUserById(Number(params.id));
    const recipes: IRecipe[] = await getRecipes();
    const userRecipes = recipes.filter(recipe => recipe.userId === user.id);

    return (
        <div>
            <h1>{user.name}</h1>
            <p>
                <strong>Username:</strong> {user.username}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <p>
                <strong>Телефон:</strong> {user.phone}
            </p>
            <p>
                <strong>Адрес:</strong> {user.address.street}, {user.address.city}
            </p>

            <h2>Рецепты пользователя</h2>
            <ul>
                {userRecipes.map(recipe => (
                    <li key={recipe.id}>
                        <Link href={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                    </li>
                ))}
            </ul>
            <Link href="/users">Назад к пользователям</Link>
        </div>
    );
};

export default UserDetailPage;