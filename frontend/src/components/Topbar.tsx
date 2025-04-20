import { Link } from "react-router-dom";
import { LayoutDashboardIcon } from "lucide-react"
import SignInAuthButtons from "./signInAuthButtons";
import { SignedOut, SignedIn, SignOutButton } from "@clerk/clerk-react";

const Topbar = () => {
    const isAdmin = false;
    return (
        <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
            <div className="flex items-center gap-2">
                <img className="invert" src="/logo.spotify.svg" />
                <p>Spotify</p>
            </div>
            <div className="flex items-center gap-4">
                {
                    isAdmin && (
                        <Link to="/admin">
                            <LayoutDashboardIcon className="size-4 mr-2" />
                            Admin Dashboard
                        </Link>
                    )
                }

                <SignedIn>
                    <SignOutButton />
                </SignedIn>

                <SignedOut>
                    <SignInAuthButtons />
                </SignedOut>
            </div>
        </div>
    )
}

export default Topbar
