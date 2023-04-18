import { LucideProps, UserPlus } from "lucide-react"

export const Icons = {
    Logo: (props: LucideProps) => (
        <svg
            // height="2500" width="2367" 
            {...props} viewBox="0 0 479.4 506.3" xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m108.8 269.7v-162.5h-71c-20.9 0-37.8 17-37.8 37.9v335.9c0 16.9 20.4 25.3 32.3 13.4l78.1-78.1h222.4c20.9 0 37.8-16.9 37.8-37.8v-71h-223.9c-20.9 0-37.9-16.9-37.9-37.8z"
                fill="#C77DFF" />
            <path
                d="m441.6 0h-294.9c-20.9 0-37.8 16.9-37.8 37.8v69.4h223.9c20.9 0 37.8 16.9 37.8 37.8v162.4h71c20.9 0 37.8-16.9 37.8-37.8v-231.8c0-20.9-16.9-37.8-37.8-37.8z"
                fill="#5A189A" />
            <path d="m332.8 107.2h-224v162.4c0 20.9 16.9 37.8 37.8 37.8h223.9v-162.3c.1-20.9-16.8-37.9-37.7-37.9z"
                fill="#9D4EDD" />
        </svg>
    ),
    UserPlus
}

export type Icon = keyof typeof Icons