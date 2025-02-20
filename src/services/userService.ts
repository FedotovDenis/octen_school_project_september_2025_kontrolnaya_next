export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
    };
}

const API_URL = "https://dummyjson.com/users";

export async function getUsers(): Promise<IUser[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    const data = await response.json();

    const mappedUsers: IUser[] = data.users.map((user: any) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: {
            street: user.address.address,
            city: user.address.city,
        },
    }));
    return mappedUsers;
}

export async function getUserById(id: number): Promise<IUser> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch user with ID ${id}`);
    }
    const user = await response.json();
    const mappedUser: IUser = {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: {
            street: user.address.address,
            city: user.address.city,
        },
    };
    return mappedUser;
}