// app/not-found.jsx

export default function NotFound() {
    return (
        <div className="min-h-screen px-5 flex flex-col items-center justify-center bg-[#d6d6d6] text-black">
            <h1 className="text-7xl mb-3  ">4<span className="text-primary">0</span>4</h1>
            <h1 className="text-4xl font-bold">
                <span className=" ">P</span>
                <span className="">a</span>
                <span className="">g</span>
                <span className="">e</span>
                <span className=""> </span>
                <span className="">N</span>
                <span className="text-primary">o</span>
                <span className="">t</span>
                <span className=""> </span>
                <span className="">F</span>
                <span className="">o</span>
                <span className="">u</span>
                <span className="text-primary">n</span>
                <span className="text-primary">d</span>
            </h1>
            <p className="mt-4 text-lg hidden md:block">Sorry, we couldn’t find the page you were looking for.</p>
        </div>
    );
}
