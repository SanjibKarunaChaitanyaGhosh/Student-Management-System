function Navbar() {

    const admin = JSON.parse(
        localStorage.getItem("admin")
    );

    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">

            <div>
                <h2 className="text-lg font-semibold">
                    Admin Dashboard
                </h2>
            </div>


            <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {admin?.name?.charAt(0) || "A"}
                </div>

                <div>

                    <p className="font-medium">
                        {admin?.name || "Administrator"}
                    </p>

                    <p className="text-xs text-gray-500">
                        Administrator
                    </p>

                </div>

            </div>

        </header>
    );
}

export default Navbar;