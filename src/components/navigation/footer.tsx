export const Footer = async () => {
    return (
        <footer className="border-t py-8">
            <div className="md:text-center">
                <p className="text-muted-foreground">© {new Date().getFullYear()} Base project. All rights reserved.</p>
            </div>
        </footer >
    )
}