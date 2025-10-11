export interface Project {
    name: string;
    link: string;
    tags: string[];
}

export interface Category {
    title: string;
    projects: Project[];
}

export const projectsData: Category[] = [
    {
        title: "Full Stack Development",
        projects: [
            {
                name: "Online Invoice Monitoring",
                link: "https://minhasnotas.com",
                tags: [
                    "React.js",
                    "Next.js",
                    "Node.js",
                    "Docker",
                    "AWS",
                    "Tailwind",
                    "PostgreSQL",
                ],
            },
        ],
    },
    {
        title: "Backend Development",
        projects: [
            {
                name: "Full ERP RESTful API Integration",
                link: "https://api-doc.sgsistemas.com.br/",
                tags: ["C", "C++", "NGINX", "Postman"],
            },
        ],
    },
    {
        title: "DevOps",
        projects: [
            {
                name: "Automatic File Character Filtering",
                link: "https://github.com/MateusZanchoNeto/exportbranch",
                tags: ["Rust", "Regex", "IO", "CI/CD"],
            },
            {
                name: "Harbour Project Manager",
                link: "https://github.com/MateusZanchoNeto/ZMakerCPP",
                tags: ["C++", "Linux", "Ubuntu", "OpenSSL", "SSH"],
            },
            {
                name: "Java API for compiling Harbour Projects",
                link: "https://github.com/MateusZanchoNeto/cpx",
                tags: ["Java", "Spring Boot", "JWT"],
            },
        ],
    },
    {
        title: "VS Code",
        projects: [
            {
                name: "Extension to speed up terminal commands",
                link: "https://marketplace.visualstudio.com/items?itemName=MateusZanchoNeto.compex",
                tags: ["Javascript", "Bash", "CMD", "VS Code"],
            },
        ],
    },
    {
        title: "Study",
        projects: [
            {
                name: "Tons of React Projects",
                link: "https://github.com/MateusZanchoNeto/react-course",
                tags: [
                    "React",
                    "HTML",
                    "CSS",
                    "Tailwind",
                    "Redux",
                    "React Hooks",
                    "React Router",
                    "Best Practices",
                ],
            },
        ],
    },
    {
        title: "Books",
        projects: [
            {
                name: "Clean Architecture Summary",
                link: "https://github.com/MateusZanchoNeto/arquitetura-limpa",
                tags: ["Rust", "MdBook", "Clean Architecture"],
            },
            {
                name: "Design Patterns Summary",
                link: "https://github.com/MateusZanchoNeto/design-patterns",
                tags: ["Rust", "MdBook", "Design Patterns"],
            },
        ],
    },
    {
        title: "Games",
        projects: [
            {
                name: "Snake Game",
                link: "https://github.com/MateusZanchoNeto/ggez_snake_game",
                tags: ["Rust", "ggez", "Game Development"],
            },
        ],
    },
    {
        title: "Portfolio",
        projects: [
            {
                name: "My Portfolio",
                link: "https://github.com/MateusZanchoNeto/zancho.dev",
                tags: [
                    "React.js",
                    "Next.js",
                    "Redux",
                    "Tailwind",
                    "Node Mailer",
                    "Framer Motion",
                ],
            },
        ],
    },
    {
        title: "Meme",
        projects: [
            {
                name: "Terminal Spinning Donut",
                link: "https://github.com/MateusZanchoNeto/donut",
                tags: ["Rust"],
            },
        ],
    },
];
