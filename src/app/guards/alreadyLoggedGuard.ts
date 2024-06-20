import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const alreadyLoggedGuard = () => {

    const router = inject(Router);

    if (localStorage.getItem("admin_token")) {
        router.navigate(["/"]);
        return false;
    } else {
        return true;
    }
}