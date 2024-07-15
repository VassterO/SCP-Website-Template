export const homeConfig = {
    title: "Your Title",
    titleColor: "text-red-500",
    description: "Your description",
    descriptionColor: "text-white",
    backgroundColor: "bg-gray-900",
    containerMaxWidth: "max-w-3xl",
    buttonSpacing: "space-x-4",
    buttons: [
        {
            text: "Join Discord",
            link: "https://discord.gg/your-discord-link",
            type: "external",
            className: "bg-blue-600 hover:bg-blue-700 text-white"
        },
        {
            text: "Server Information",
            link: "/server",
            type: "internal",
            className: "bg-red-600 hover:bg-red-700 text-white"
        }
    ]
};