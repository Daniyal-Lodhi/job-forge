import SeekerState from "../context/seeker/SeekerState";

export default function RootLayout({ children }) {
    return (

        <SeekerState>
            {children}
        </SeekerState>

    )
}