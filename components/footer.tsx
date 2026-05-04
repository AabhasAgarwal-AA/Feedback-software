
export default function Footer() {
    const currentYear = new Date().getFullYear();
    return <footer className="border-t bg-background mt-auto">
        <div className="container mx-auto px-4 py-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <span>
                    Copyright @cc Feedback-software 
                </span>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                        {currentYear}
                    </span>
                </div>
            </div>
        </div> 
    </footer>
}