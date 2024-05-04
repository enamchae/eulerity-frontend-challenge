export const downloadFile = async (url: string, filename: string) => {
    const blob = await (await fetch(url)).blob();
    const blobUrl = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = filename;
    anchor.click();

    URL.revokeObjectURL(blobUrl);
};