import type { ReactNode } from "react";

import { createRootRoute, Outlet } from "@tanstack/react-router";

import NotFoundPage from "./-pages/not_found/NotFoundPage";

export const Route = createRootRoute({
    component : RootComponent,
    notFoundComponent : NotFoundPage,
});

function RootComponent () : ReactNode {

    return (
        <Outlet />
    );
}