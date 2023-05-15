type ContentWrapProps = {
    children: string | JSX.Element | JSX.Element[]
}

export default function ContentWrap ({ children } : ContentWrapProps){

    return <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-full md:w-3/5 md:max-w-screen-md flex-col">
            <div className="w-full">
                {children}
            </div>
        </div>
    </div>;
}