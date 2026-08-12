export default function Index({ users }) {
    return (
        <div>
            <h1>Users</h1>

            {users.map((user) => (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    );
}