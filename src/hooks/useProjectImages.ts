import { useEffect, useState } from 'react'

const MAX_IMAGES = 15

const imageExists = (src: string): Promise<boolean> =>
    new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = src
    })

/**
 * Detects which numbered images actually exist for a project
 * (e.g. typerace1.png, typerace2.png, typerace3.png, ...) and stops
 * at the first missing number. Keeps the first image as an immediate
 * fallback while the async detection runs, so the card never flashes empty.
 */
export const useProjectImages = (basePath: string, maxImages: number = MAX_IMAGES) => {
    const [images, setImages] = useState<string[]>([`${basePath}1.png`])

    useEffect(() => {
        let cancelled = false

        const detect = async () => {
            const checks = await Promise.all(
                Array.from({ length: maxImages }, (_, i) => {
                    const src = `${basePath}${i + 1}.png`
                    return imageExists(src).then((exists) => (exists ? src : null))
                })
            )

            const found: string[] = []
            for (const src of checks) {
                if (!src) break
                found.push(src)
            }

            if (!cancelled && found.length > 0) {
                setImages(found)
            }
        }

        detect()

        return () => {
            cancelled = true
        }
    }, [basePath, maxImages])

    return images
}