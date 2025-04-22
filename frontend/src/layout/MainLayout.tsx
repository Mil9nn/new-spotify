import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";


const MainLayout = () => {
    const isMobile = false;
    return (
        <div className="h-screen flex flex-col">
            <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
                {/* Left side bar */}
                <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 20} maxSize={30}>
                    <LeftSidebar />
                </ResizablePanel>
                <ResizableHandle />
                {/* Main content */}
                <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                    <Outlet />
                </ResizablePanel>
                <ResizableHandle />
                {/* Right side bar */}
                <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                    friends activity
                </ResizablePanel>
                <ResizableHandle />
            </ResizablePanelGroup>
        </div>
    )
}

export default MainLayout
