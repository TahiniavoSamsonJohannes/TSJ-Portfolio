import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiOutlineXMark, HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

type ProjectModalProps = {
    isOpen: boolean
    onClose: () => void
    title: string
    images: string[]
    /** Bounding rect of the thumbnail image in the ProjectCard, captured right
     *  before opening. Used to "fly" the image from the card into the modal
     *  (and back on close) instead of a plain fade/zoom. */
    originRect: DOMRect | null
}

// Keep this in sync with the CSS transition durations used below.
const TRANSITION_MS = 380
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)'

const ProjectModal = ({ isOpen, onClose, title, images, originRect }: ProjectModalProps) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState<'left' | 'right'>('right')
    const [hasNavigated, setHasNavigated] = useState(false)

    // Keeps the modal mounted for the duration of the closing (shrink-back)
    // animation, even after the parent has already flipped isOpen to false.
    const [shouldRender, setShouldRender] = useState(isOpen)
    const [phase, setPhase] = useState<'entering' | 'open' | 'exiting'>('entering')
    const [backdropVisible, setBackdropVisible] = useState(false)

    const imgRef = useRef<HTMLImageElement>(null)
    const closeTimeoutRef = useRef<number | null>(null)

    // Reset to the first image every time a new project is opened
    useEffect(() => {
        if (isOpen) {
            setActiveIndex(0)
            setHasNavigated(false)
        }
    }, [isOpen, title])

    // Drive the mount/unmount + phase lifecycle from the isOpen prop.
    useEffect(() => {
        if (isOpen) {
            if (closeTimeoutRef.current) {
                window.clearTimeout(closeTimeoutRef.current)
                closeTimeoutRef.current = null
            }
            setShouldRender(true)
            setPhase('entering')
            setBackdropVisible(false)
            const raf = requestAnimationFrame(() => setBackdropVisible(true))
            return () => cancelAnimationFrame(raf)
        }

        if (shouldRender) {
            setPhase('exiting')
            setBackdropVisible(false)
            closeTimeoutRef.current = window.setTimeout(() => {
                setShouldRender(false)
            }, TRANSITION_MS)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
        }
    }, [])

    // FLIP — entrance: instantly snap the (already fully laid-out) image so it
    // visually overlaps the card's thumbnail exactly, then release it on the
    // next frame so it animates smoothly from the card into full modal size.
    useLayoutEffect(() => {
        if (phase !== 'entering' || !shouldRender) return
        const img = imgRef.current
        if (!img) return

        if (!originRect) {
            img.style.transition = 'none'
            img.style.transformOrigin = 'center center'
            img.style.transform = 'scale(0.9)'
            img.style.opacity = '0'
            requestAnimationFrame(() => {
                img.style.transition = `transform ${TRANSITION_MS}ms ${EASE_OUT}, opacity ${TRANSITION_MS}ms ease-out`
                img.style.transform = 'scale(1)'
                img.style.opacity = '1'
                setPhase('open')
            })
            return
        }

        const finalRect = img.getBoundingClientRect()
        const scaleX = originRect.width / finalRect.width
        const scaleY = originRect.height / finalRect.height
        const translateX = (originRect.left + originRect.width / 2) - (finalRect.left + finalRect.width / 2)
        const translateY = (originRect.top + originRect.height / 2) - (finalRect.top + finalRect.height / 2)

        img.style.transition = 'none'
        img.style.transformOrigin = 'center center'
        img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`
        img.style.opacity = '1'

        // Force layout so the browser registers the snapped state before we
        // animate away from it.
        void img.offsetWidth

        requestAnimationFrame(() => {
            img.style.transition = `transform ${TRANSITION_MS}ms ${EASE_OUT}`
            img.style.transform = 'translate(0, 0) scale(1, 1)'
            setPhase('open')
        })
    }, [phase, shouldRender, originRect])

    // FLIP — exit: animate the image back down onto the card's rect.
    useLayoutEffect(() => {
        if (phase !== 'exiting') return
        const img = imgRef.current
        if (!img) return

        if (!originRect) {
            img.style.transition = `transform ${TRANSITION_MS}ms ${EASE_IN}, opacity ${TRANSITION_MS}ms ease-in`
            img.style.transformOrigin = 'center center'
            img.style.transform = 'scale(0.9)'
            img.style.opacity = '0'
            return
        }

        const finalRect = img.getBoundingClientRect()
        const scaleX = originRect.width / finalRect.width
        const scaleY = originRect.height / finalRect.height
        const translateX = (originRect.left + originRect.width / 2) - (finalRect.left + finalRect.width / 2)
        const translateY = (originRect.top + originRect.height / 2) - (finalRect.top + finalRect.height / 2)

        img.style.transformOrigin = 'center center'
        img.style.transition = `transform ${TRANSITION_MS}ms ${EASE_IN}`
        img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`
    }, [phase, originRect])

    const goNext = () => {
        setDirection('right')
        setHasNavigated(true)
        setActiveIndex((i) => (i + 1) % images.length)
    }

    const goPrev = () => {
        setDirection('left')
        setHasNavigated(true)
        setActiveIndex((i) => (i - 1 + images.length) % images.length)
    }

    const goTo = (index: number) => {
        setDirection(index > activeIndex ? 'right' : 'left')
        setHasNavigated(true)
        setActiveIndex(index)
    }

    // Lock body scroll + keyboard navigation while the modal is open
    useEffect(() => {
        if (!isOpen) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowRight') goNext()
            if (e.key === 'ArrowLeft') goPrev()
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleKeyDown)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, onClose, images.length])

    if (!shouldRender) return null

    const hasMultiple = images.length > 1

    const modalContent = (
        <div
            className={`fixed inset-0 z-9999 overflow-y-auto bg-black/85 backdrop-blur-md transition-opacity duration-300 ease-out ${backdropVisible ? 'opacity-100' : 'opacity-0'
                }`}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={onClose}
        >
            {/* Keyframes for the image slide transition between pictures */}
            <style>{`
                @keyframes projectModalSlideInRight {
                    from { transform: translateX(48px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes projectModalSlideInLeft {
                    from { transform: translateX(-48px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>

            {/* Close button pinned to the viewport — always reachable, above everything */}
            <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className={`fixed right-4 top-4 z-10000 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-950 text-neutral-200 shadow-lg transition-all duration-300 hover:bg-neutral-800 hover:text-white ${backdropVisible ? 'opacity-100' : 'opacity-0'
                    }`}
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
                    <div
                        className={`flex items-center gap-3 text-sm text-neutral-300 transition-opacity duration-300 ${backdropVisible ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <span className="font-medium text-neutral-100">{title}</span>
                        {hasMultiple && (
                            <>
                                <span className="h-1 w-1 rounded-full bg-neutral-600" aria-hidden="true" />
                                <span>{activeIndex + 1} / {images.length}</span>
                            </>
                        )}
                    </div>

                    {/* The image itself — shown in full, never cropped, only the edges are rounded.
                        On open/close, an imperative FLIP transform (via imgRef) flies it to/from
                        the ProjectCard's thumbnail rect. Between images, a CSS keyframe slide
                        (re-triggered by the `key` change) takes over instead. */}
                    <div className="relative w-full">
                        <img
                            key={activeIndex}
                            ref={imgRef}
                            src={images[activeIndex]}
                            alt={`${title} - ${activeIndex + 1}`}
                            className="mx-auto max-h-[70vh] w-auto max-w-full rounded-lg object-contain"
                            style={
                                hasNavigated && phase === 'open'
                                    ? {
                                        animation: `${direction === 'right' ? 'projectModalSlideInRight' : 'projectModalSlideInLeft'
                                            } 0.35s ease-out`,
                                    }
                                    : undefined
                            }
                        />

                        {hasMultiple && (
                            <>
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    aria-label="Image précédente"
                                    className={`absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/70 text-white backdrop-blur transition-all duration-300 hover:bg-blue-600 ${backdropVisible ? 'opacity-100' : 'opacity-0'
                                        }`}
                                >
                                    <HiChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    aria-label="Image suivante"
                                    className={`absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/70 text-white backdrop-blur transition-all duration-300 hover:bg-blue-600 ${backdropVisible ? 'opacity-100' : 'opacity-0'
                                        }`}
                                >
                                    <HiChevronRight className="h-5 w-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {hasMultiple && (
                        <div
                            className={`flex max-w-full gap-2 overflow-x-auto px-1 py-1 transition-opacity duration-300 ${backdropVisible ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            {images.map((src, index) => (
                                <button
                                    key={src}
                                    type="button"
                                    onClick={() => goTo(index)}
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