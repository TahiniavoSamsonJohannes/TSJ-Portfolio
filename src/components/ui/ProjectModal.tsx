import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiOutlineXMark, HiChevronLeft, HiChevronRight, HiOutlineEye } from 'react-icons/hi2'
import { FaGithub, FaGitlab } from 'react-icons/fa'

type ProjectModalProps = {
    isOpen: boolean
    onClose: () => void
    title: string
    description: string
    images: string[]
    tech: string[]
    demo: string | null
    repository: string | null
    repoType: 'github' | 'gitlab' | null
    ctaLabels: {
        viewDemo: string
        viewCode: string
        comingSoon: string
    }
}

const ProjectModal = ({
    isOpen,
    onClose,
    title,
    description,
    images,
    tech,
    demo,
    repository,
    repoType,
    ctaLabels,
}: ProjectModalProps) => {
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

    const RepoIcon = repoType === 'gitlab' ? FaGitlab : FaGithub
    const hasMultiple = images.length > 1

    const modalContent = (
        <div
            className="fixed inset-0 z-[9999] overflow-y-auto bg-black/70 backdrop-blur-sm"
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
                className="fixed right-4 top-4 z-[10000] flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-950 text-neutral-200 shadow-lg transition-colors hover:bg-neutral-800 hover:text-white"
            >
                <HiOutlineXMark className="h-5 w-5" />
            </button>

            {/* Centered when it fits, gracefully scrolls to top when content is taller than the screen */}
            <div
                className="flex min-h-full justify-center p-4 py-10"
                style={{ alignItems: 'safe center' }}
            >
                <div
                    className="relative w-full max-w-2xl self-center overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-900 shadow-2xl shadow-black/50"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Image viewer */}
                    <div className="relative h-56 shrink-0 bg-neutral-950 sm:h-72">
                        <img
                            src={images[activeIndex]}
                            alt={`${title} - ${activeIndex + 1}`}
                            className="h-full w-full object-cover"
                        />

                        {hasMultiple && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
                                    aria-label="Image précédente"
                                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/70 text-white backdrop-blur transition-colors hover:bg-blue-600"
                                >
                                    <HiChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
                                    aria-label="Image suivante"
                                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/70 text-white backdrop-blur transition-colors hover:bg-blue-600"
                                >
                                    <HiChevronRight className="h-5 w-5" />
                                </button>

                                <div className="absolute bottom-3 right-3 rounded-full bg-neutral-950/70 px-3 py-1 text-xs font-medium text-neutral-200 backdrop-blur">
                                    {activeIndex + 1} / {images.length}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Numbered thumbnails — only the images that were actually detected */}
                    {hasMultiple && (
                        <div className="flex gap-2 overflow-x-auto border-b border-neutral-800 bg-neutral-950/50 px-4 py-3">
                            {images.map((src, index) => (
                                <button
                                    key={src}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${activeIndex === index
                                            ? 'border-blue-200'
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <img src={src} alt="" className="h-full w-full object-cover" />
                                    <span className="absolute bottom-0.5 right-1 text-[10px] font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Content */}
                    <div className="px-6 py-6">
                        <h3 className="mb-3 text-2xl font-bold text-blue-200">{title}</h3>
                        <p className="mb-5 text-sm leading-relaxed text-neutral-300">{description}</p>

                        <div className="mb-6 flex flex-wrap gap-2">
                            {tech.map((item, i) => (
                                <span
                                    key={i}
                                    className="rounded-full border border-blue-200/20 bg-blue-200/10 px-3 py-1 text-xs text-blue-200"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            {demo ? (
                                <a
                                    href={demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-white transition-colors hover:bg-blue-700"
                                >
                                    <HiOutlineEye className="h-4 w-4" />
                                    {ctaLabels.viewDemo}
                                </a>
                            ) : (
                                <div className="flex flex-1 items-center justify-center rounded-lg bg-neutral-800 px-4 py-2.5 text-sm text-neutral-400">
                                    {ctaLabels.comingSoon}
                                </div>
                            )}

                            {repository && (
                                <a
                                    href={repository}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-4 py-2.5 text-sm text-blue-200 transition-colors hover:bg-blue-600/10"
                                >
                                    <RepoIcon className="h-4 w-4" />
                                    {ctaLabels.viewCode}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}

export default ProjectModal