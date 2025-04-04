import Search from "@/components/Search/Search";
import React, { Suspense } from "react";

const page = () => {






    return (
        <Suspense fallback={"loading.."}>
            <Search />
        </Suspense>
    );
};

export default page;