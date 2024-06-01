import { useEffect, useState } from "react"

interface User {
    FirstNameLastName: string;
    ID: number;
    JobTitle: string;
    Email: string;
    Phone: string;
    Company: string;
}

const Pagination = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);

    const fetchUsers = (pageNum: number) => {
        fetch(`https://give-me-users-forever.vercel.app/api/users/${pageNum}/next`)
        .then(response => response.json())
        .then(data => setUsers(data.users))
        .catch(err => console.log('Error Fetching Data:', err));
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const handlePrev = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        setPage(prev => prev + 1);
    };

    return (
        <div className="container mx-auto p-2 bg-gray-300 shadow-lg rounded-lg">
            <h1 className="text-xl font-bold mb-2 text-gray-500">User List</h1>
            <table className="bg-white border rounded-lg shadow-md w-full">
                <thead>
                    <tr>
                        <th className="py-1 px-2 bg-gray-200 border-b text-center text-gray-600">Name</th>
                        <th className="py-1 px-2 bg-gray-200 border-b text-center text-gray-600">Email</th>
                        <th className="py-1 px-2 bg-gray-200 border-b text-center text-gray-600">Job Title</th>
                        <th className="py-1 px-2 bg-gray-200 border-b text-center text-gray-600">Phone</th>
                        <th className="py-1 px-2 bg-gray-200 border-b text-center text-gray-600">Company</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.ID} className="border-b">
                            <td className="py-1 px-2 text-center">{user.FirstNameLastName}</td>
                            <td className="py-1 px-2 text-center">{user.Email}</td>
                            <td className="py-1 px-2 text-center">{user.JobTitle}</td>
                            <td className="py-1 px-2 text-center">{user.Phone}</td>
                            <td className="py-1 px-2 text-center">{user.Company}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-2 gap-x-4">
                <button
                    onClick={handlePrev}
                    className="bg-blue-500 text-white text-sm px-3 rounded hover:bg-blue-700"
                    disabled={page === 1}
                >
                    Prev
                </button>
                <span className=" text-gray-600 font-bold">
                    Page {page}
                </span>
                <button
                    onClick={handleNext}
                    className="bg-blue-500 text-white text-sm px-3 rounded hover:bg-blue-700"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
