export class FileUtils {
    static loadPageScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve('Script loaded: ' + src);
            script.onerror = () => reject(new Error("Script load error for: " + src));
            document.body.appendChild(script);
        });
    }

    static loadPageStyle(src, insertBeforeElement) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = src;
        document.head.insertBefore(link, insertBeforeElement);
    }
}