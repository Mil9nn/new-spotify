import { Link } from "react-router-dom"
import { HomeIcon, MessageCircle, Library } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignedIn } from "@clerk/clerk-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from 'react';

const LeftSidebar = () => {
    const { songs, albums, fetchAlbums, isLoading } = useMusicStore();

    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums])

    console.log({ albums });

    return (
        <div className="h-full flex flex-col gap-2">
            {/* Navigation Menu */}
            <div className="rounded-lg bg-zinc-900 p-4">
                <div className="space-y-2">
                    <Link to={"/"} className={cn(buttonVariants(
                        {
                            variant: "ghost",
                            className: "w-full justify-start text-white hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
                        }
                    ))}>
                        <HomeIcon className="mr-2 size-5" />
                        <span className="hidden md:inline">Home</span>
                    </Link>

                    <SignedIn>
                        <Link to={"/chat"} className={cn(buttonVariants(
                            {
                                variant: "ghost",
                                className: "w-full justify-start text-white hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
                            }
                        ))}>
                            <MessageCircle className="mr-2 size-5" />
                            <span className="hidden md:inline">Messages</span>
                        </Link>
                    </SignedIn>
                </div>
            </div>

            {/* Library Section */}
            <div className="flex-1 rounded-lg  bg-zinc-900 p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-white px-2">
                        <Library className="size-5 mr-2" />
                        <span className="hidden md:inline">Playlists</span>
                    </div>
                </div>

                <ScrollArea className="h-[calc(100vh - 300px)]">
                    <div className="space-y-2">
                        {
                            isLoading ? (
                                <PlaylistSkeleton />
                            ) : (
                                albums.map((album) =>
                                    <Link to={`/albums/${album._id}`} key={album._id} className="p-2 rounded-md hover: bg-zinc-800 flex items-center gap-3 group cursor-pointer">
                                        <img src={album.imageUrl} alt="playlist image" className="size-12 rounded-md flex-srink-0 object-cover" />
                                        <div className="flex-1 min-w-0 hidden md:block">
                                            <p className="font-medium truncate">{album.title}</p>
                                            <p className="text-sm text-zinc-400 truncate">Album • {album.artist}</p>
                                        </div>
                                    </Link>
                                )
                            )
                        }
                    </div>
                </ScrollArea>

            </div>
        </div>
    )
}

export default LeftSidebar
