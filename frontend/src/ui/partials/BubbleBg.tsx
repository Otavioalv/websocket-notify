import React from "react";

export default function BubbleBg() {
    return (        
			<div className="fixed w-full h-full z-0 overflow-hidden">
            {/* bubbles 1 */}
            <div className=" 
                shadow-bubble 
                animate-floatBubble-5
                bg-custon-bubble-5

                w-96 
                h-96 
                rounded-full 
                absolute 
                right-3/4 
                -top-1/4"
                >
            </div>

            {/* bubbles 2 */}
            <div className="
                shadow-bubble 
                animate-floatBubble-4
                bg-custon-bubble-4

                w-16 
                h-16 
                rounded-full 
                absolute 
                right-1/4 
                top-2/3"
                >
            </div>

            {/* bubbles 3 */}
            <div className="
                z-20
                shadow-bubble 
                animate-floatBubble-3
                bg-custon-bubble-3

                w-28 
                h-28 
                rounded-full 
                absolute 
                left-1/3 
                bottom-1/2"
                >
            </div>

            {/* bubbles 4 left-2/3 top-1/4   right-72 top-52 */}
            <div className="
                z-20
                shadow-bubble 
                animate-floatBubble-2
                bg-custon-bubble-2
                
                w-44
                h-44 
                rounded-full
                absolute 
                left-2/3 
                top-1/4"
                >
            </div>


            {/* bubbles 4 right-3/4 top-2/3  -left-10 bottom-10*/}
            {/* instalar nova versao taisindcss */}
            <div className="
                shadow-bubble 
                animate-floatBubble-1
                bg-custon-bubble-1 

                w-72 
                h-72

                rounded-full 
                absolute 
                right-3/4 
                top-2/3"
                >
            </div>

            {/* line bubble 1*/}
            <div
                className="
                    z-10
                    border
                    border-white
                    animate-floatBubble-2
                    w-[40em] 
                    h-[40em] 
                    rounded-full 
                    absolute 
                    right-[60%] 
                    top-[30%]
                "
            >
            </div>


            {/* line bubble 2*/}
            <div
                className="
                    z-10
                    border
                    border-white
                    animate-floatBubble-4
                    w-[50em] 
                    h-[50em] 
                    rounded-full 
                    absolute 
                    right-[10%] 
                    bottom-[60%]
                "
            ></div>
            
        </div>
    )
}