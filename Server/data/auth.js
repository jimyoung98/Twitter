// abcd1234: $2b$10$GwyIqFlKaQtfNmyrl1oddOe7skxOZbPKQzzfeDlmI3jVFuooHn1gm

let users = [
    {
        id: '1',
        username: 'melon',
        password: '$2b$10$GwyIqFlKaQtfNmyrl1oddOe7skxOZbPKQzzfeDlmI3jVFuooHn1gm',
        name: '이메론',
        email: 'email@melon.com',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87Gr4eFO7Pt2pE8oym4dxXnxGZYL2Pl_N5A&usqp=CAU'
    }
]

export async function findByUsername(username) {
    return users.find((user) => user.username === username);
}

export async function findById(id) {
    return users.find((user) => user.id === id);
}

export async function createUser(user) {
    const created = { ...user, id: Date.now().toString() }
    users.push(created)
    return created.id;
}