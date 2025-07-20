import { AnimatePresence, motion } from "framer-motion";

export default function Logo() {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="intro"
                className="w-screen h-screen max-w-screen max-h-screen 
                        flex flex-col justify-center items-center overflow-y-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-fit h-fit flex flex-col items-center justify-center overflow-hidden"
                >
                    <img src="/logo.png" alt="logo" className="w-40 aspect-square object-cover mb-4" />
                    <h1 className="text-4xl font-bold">Wolf Forest</h1>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
