import AdmZip from "adm-zip";

export async function zip (filesPath: string): Promise<Buffer> {
    const zip = new AdmZip()
    await zip.addLocalFolderPromise(filesPath, {})
    return await zip.toBufferPromise()
}