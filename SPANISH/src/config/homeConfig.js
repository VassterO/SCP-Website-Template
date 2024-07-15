export const homeConfig = {
    title: "Tu Titulo",
    titleColor: "text-red-500",
    description: "Tu descripcion",
    descriptionColor: "text-white",
    backgroundColor: "bg-gray-900",
    containerMaxWidth: "max-w-3xl",
    buttonSpacing: "space-x-4",
    buttons: [
        {
            text: "Unirse a Discord",
            link: "https://discord.gg/tu-enlace-de-discord",
            type: "external",
            className: "bg-blue-600 hover:bg-blue-700 text-white"
        },
        {
            text: "Información del Servidor",
            link: "/servidor",
            type: "internal",
            className: "bg-red-600 hover:bg-red-700 text-white"
        }
    ]
};