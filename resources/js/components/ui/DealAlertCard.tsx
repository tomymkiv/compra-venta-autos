interface DealAlertCardProps {
    title: string;
    text: string;
    greenBackground?: boolean;
    redBackground?: boolean;
    yellowBackground?: boolean;
    children?: React.ReactNode;
}
export default function DealAlertCard({ children, title, text, greenBackground, redBackground, yellowBackground }: DealAlertCardProps) {
    return (
        <div className={`bg-gradient-to-br ${greenBackground ? "from-green-950/95 to-green-900/95 border border-green-500/35" : redBackground ? "from-red-950/95 to-red-900/95 border border-red-500/35" : yellowBackground ? "from-yellow-950/95 to-orange-900/95 border border-yellow-500/35" : "from-yellow-950/95 to-orange-900/95 border border-yellow-500/35"} rounded-xl p-4 sm:p-5 mt-1`}>
            <div className="flex items-center gap-2 mb-2.5">
                <svg className={`w-4 h-4 shrink-0 ${greenBackground ? "text-green-500" : redBackground ? "text-red-500" : "text-yellow-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {
                        greenBackground && <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    }
                    {
                        redBackground && <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    }
                    {
                        yellowBackground && <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    }
                </svg>
                <p className={`font-semibold text-xs sm:text-sm m-0 ${greenBackground ? "text-green-500" : redBackground ? "text-red-500" : "text-yellow-500"}`}>{title}</p>
            </div>
            <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                {text}
            </p>
            <div>
                {children}
            </div>
        </div>
    )
}
