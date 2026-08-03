import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiOutlineXMark, HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

type ProjectModalProps = {
    isOpen: boolean
    onClose: () => void
    title: string
    images: string[]
}

const ProjectModal = ({ isOpen, onClose, title, images }: ProjectModalProps) => {
    const [activeIndex, setActiveIndex] = useState(0)

    // Reset to the first image every time a new project is opened
    useEffect(() => {
        if (isOpen) setActiveIndex(0)
    }, [isOpen, title])

    // Lock body scroll + keyboard navigation while the modal is open
    useEffect(() => {
        if (!isOpen) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % images.length)
            if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + images.length) % images.length)
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose, images.length])

    if (!isOpen) return null

    const hasMultiple = images.length > 1

    const modalContent = (
        <div
            className="fixed inset-0 z-9999 overflow-y-auto bg-black/85 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={onClose}
        >
            {/* Close button pinned to the viewport — always reachable, above everything */}
            <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="fixed right-4 top-4 z-10000 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-950 text-neutral-200 shadow-lg transition-colors hover:bg-neutral-800 hover:text-white"
            >
                <HiOutlineXMark className="h-5 w-5" />
            </button>

            {/* Centered when it fits, gracefully scrolls to top when content is taller than the screen */}
            <div
                className="flex min-h-full justify-center p-4 py-16 sm:py-10"
                style={{ alignItems: 'safe center' }}
            >
                <div
                    className="flex w-full max-w-4xl flex-col items-center gap-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Caption */}
                    <div className="flex items-center gap-3 text-sm text-neutral-300">
                        <span className="font-medium text-neutral-100">{title}</span>
                        {hasMultiple && (
                            <>
                                <span className="h-1 w-1 rounded-full bg-neutral-600" aria-hidden="true" />
                                <span>{activeIndex + 1} / {images.length}</span>
                            </>
                        )}
                    </div>

                    {/* The image itself — shown in full, never cropped, only the edges are rounded */}
                    <div className="relative w-full">
                        <img
                            src={images[activeIndex]}
                            alt={`${title} - ${activeIndex + 1}`}
                            className="mx-auto max-h-[70vh] w-auto max-w-full rounded-lg object-contain"
                        />

                        {hasMultiple && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
                                    aria-label="Image précédente"
                                    className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/70 text-white backdrop-blur transition-colors hover:bg-blue-600"
                                >
                                    <HiChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
                                    aria-label="Image suivante"
                                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/70 text-white backdrop-blur transition-colors hover:bg-blue-600"
                                >
                                    <HiChevronRight className="h-5 w-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {hasMultiple && (
                        <div className="flex max-w-full gap-2 overflow-x-auto px-1 py-1">
                            {images.map((src, index) => (
                                <button
                                    key={src}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${activeIndex === index
                                            ? 'border-blue-300'
                                            : 'border-transparent opacity-50 hover:opacity-90'
                                        }`}
                                >
                                    <img src={src} alt="" className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}

export default ProjectModal