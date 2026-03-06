import { useRef, useState, useCallback, useEffect } from 'react'
import { ChevronLeft } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'
import UFIRow from '../components/UFIRow'
import { asset } from '../utils/asset'

interface FeedItem {
  id: string
  gameImage: string
  title: string
  author: string
  authorAvatar: string
  gameThumb: string
  likes: string
  comments: string
  remixes: string
  remixAvatars: { src: string; badge: boolean }[]
  iframeUrl?: string
}

const feedItems: FeedItem[] = [
  {
    id: '1',
    gameImage: asset('/game-card.jpg'),
    iframeUrl: 'https://andrew-lindley.github.io/survivorlite/',
    title: 'Skate Run',
    author: 'MabelSyrup',
    authorAvatar: asset('/avatar-overlay.jpg'),
    gameThumb: asset('/game-thumb.jpg'),
    likes: '2M',
    comments: '65',
    remixes: '245',
    remixAvatars: [
      { src: asset('/avatar-creator-1.jpg'), badge: true },
      { src: asset('/avatar-mabel.jpg'), badge: true },
    ],
  },
  {
    id: '2',
    gameImage: asset('/grid-3.jpg'),
    iframeUrl: 'https://andrew-lindley.github.io/petgame/',
    title: 'Neon Drift',
    author: 'PixelWizard',
    authorAvatar: asset('/avatar-ninja.jpg'),
    gameThumb: asset('/grid-4.jpg'),
    likes: '850K',
    comments: '120',
    remixes: '89',
    remixAvatars: [{ src: asset('/avatar-ninja.jpg'), badge: true }],
  },
  {
    id: '3',
    gameImage: asset('/grid-7.jpg'),
    title: 'Desert Quest',
    author: 'SunsetCoder',
    authorAvatar: asset('/avatar-creator-1.jpg'),
    gameThumb: asset('/grid-8.jpg'),
    likes: '1.2M',
    comments: '340',
    remixes: '512',
    remixAvatars: [
      { src: asset('/avatar-creator-1.jpg'), badge: true },
      { src: asset('/avatar-mabel.jpg'), badge: true },
    ],
  },
  {
    id: '4',
    gameImage: asset('/grid-1.jpg'),
    title: 'Cyber Garden',
    author: 'FloraBot',
    authorAvatar: asset('/avatar-overlay.jpg'),
    gameThumb: asset('/grid-2.jpg'),
    likes: '430K',
    comments: '88',
    remixes: '167',
    remixAvatars: [{ src: asset('/avatar-mabel.jpg'), badge: true }],
  },
  {
    id: '5',
    gameImage: asset('/grid-9.jpg'),
    title: 'Ocean Deep',
    author: 'AquaVerse',
    authorAvatar: asset('/avatar-ninja.jpg'),
    gameThumb: asset('/grid-10.jpg'),
    likes: '2.5M',
    comments: '512',
    remixes: '1.2K',
    remixAvatars: [
      { src: asset('/avatar-creator-1.jpg'), badge: true },
      { src: asset('/avatar-ninja.jpg'), badge: true },
    ],
  },
]

const gridImages = [
  { src: asset('/grid-1.jpg'), hasAvatar: true },
  { src: asset('/grid-3.jpg'), hasAvatar: true },
  { src: asset('/grid-4.jpg'), hasAvatar: true },
  { src: asset('/grid-5.jpg'), hasAvatar: false },
  { src: asset('/grid-6.jpg'), hasAvatar: true },
  { src: asset('/grid-9.jpg'), hasAvatar: true },
  { src: asset('/grid-7.jpg'), hasAvatar: false },
  { src: asset('/grid-8.jpg'), hasAvatar: false },
  { src: asset('/grid-10.jpg'), hasAvatar: false },
  { src: asset('/grid-2.jpg'), hasAvatar: false },
  { src: asset('/grid-11.jpg'), hasAvatar: false },
  { src: asset('/grid-12.jpg'), hasAvatar: false },
]

const CARD_HEIGHT = 852
const SWIPE_THRESHOLD = 50
const VELOCITY_THRESHOLD = 0.3
const TRANSITION = 'all 0.55s cubic-bezier(0.32, 0.72, 0, 1)'

interface HomePageProps {
  expandedId: string | null
  onExpand: (id: string) => void
  onCollapse: () => void
}

function TopNav({ visible }: { visible: boolean }) {
  const [activeTab, setActiveTab] = useState<'Feed' | 'Friends'>('Feed')

  return (
    <div
      className="absolute top-[62px] left-0 right-0 z-20 flex items-center justify-center h-[44px] pointer-events-auto"
      style={{
        opacity: visible ? 1 : 0,
        transition: TRANSITION,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('Feed')}
          className={`text-[16px] font-bold transition-opacity duration-200 ${
            activeTab === 'Feed' ? 'text-white opacity-100' : 'text-white opacity-50'
          }`}
        >
          Feed
        </button>
        <button
          onClick={() => setActiveTab('Friends')}
          className={`text-[16px] font-bold transition-opacity duration-200 flex items-center gap-1 ${
            activeTab === 'Friends' ? 'text-white opacity-100' : 'text-white opacity-50'
          }`}
        >
          Friends
          <div className="flex -space-x-1">
            <div className="w-[15px] h-[15px] rounded-full overflow-hidden border border-black">
              <img src={asset('/avatar-ninja.jpg')} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-[15px] h-[15px] rounded-full overflow-hidden border border-black">
              <img src={asset('/avatar-creator-1.jpg')} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

function BackButton({ visible, onClick }: { visible: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-[62px] left-0 z-20 flex items-center justify-center w-11 h-11"
      style={{
        opacity: visible ? 1 : 0,
        transition: TRANSITION,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
    </button>
  )
}

function MediaGrid() {
  const rows = []
  for (let i = 0; i < gridImages.length; i += 3) {
    rows.push(gridImages.slice(i, i + 3))
  }
  return (
    <div className="flex flex-col gap-[1.5px] bg-[#1a1a1a] py-0.5">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-[1.5px]">
          {row.map((item, colIdx) => (
            <div key={colIdx} className="relative flex-1 aspect-[130/229] overflow-hidden">
              <img src={item.src} alt="" className="w-full h-full object-cover" />
              {item.hasAvatar && (
                <div className="absolute bottom-[5px] left-[6px] w-[18px] h-[18px] rounded-full overflow-hidden">
                  <img src={asset('/avatar-ninja.jpg')} alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function HomePage({ expandedId, onExpand, onCollapse }: HomePageProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const touchStartY = useRef(0)
  const touchStartTime = useRef(0)
  const isDragging = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const isExpanded = expandedId !== null

  const goToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(feedItems.length - 1, index))
    setIsTransitioning(true)
    setDragOffset(0)
    setCurrentIndex(clamped)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isTransitioning || isExpanded) return
    touchStartY.current = e.touches[0].clientY
    touchStartTime.current = Date.now()
    isDragging.current = true
    setIsTransitioning(false)
  }, [isTransitioning, isExpanded])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || isExpanded) return
    const deltaY = e.touches[0].clientY - touchStartY.current
    const atTop = currentIndex === 0 && deltaY > 0
    const atBottom = currentIndex === feedItems.length - 1 && deltaY < 0
    const resistance = (atTop || atBottom) ? 0.2 : 1
    setDragOffset(deltaY * resistance)
  }, [currentIndex, isExpanded])

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current || isExpanded) return
    isDragging.current = false
    const elapsed = Date.now() - touchStartTime.current
    const velocity = Math.abs(dragOffset) / elapsed

    if (Math.abs(dragOffset) > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
      if (dragOffset < 0) goToIndex(currentIndex + 1)
      else goToIndex(currentIndex - 1)
    } else {
      setIsTransitioning(true)
      setDragOffset(0)
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }, [dragOffset, currentIndex, goToIndex, isExpanded])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isExpanded) return
      e.preventDefault()
      if (isTransitioning) return
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) goToIndex(currentIndex + 1)
        else goToIndex(currentIndex - 1)
      }
    }
    const container = document.getElementById('reel-container')
    container?.addEventListener('wheel', handleWheel, { passive: false })
    return () => container?.removeEventListener('wheel', handleWheel)
  }, [currentIndex, isTransitioning, goToIndex, isExpanded])

  useEffect(() => {
    if (!isExpanded && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [isExpanded])

  const translateY = -currentIndex * CARD_HEIGHT + dragOffset

  return (
    <div
      id="reel-container"
      className="w-[393px] h-[852px] bg-black text-white overflow-hidden rounded-[50px] relative select-none"
      style={{ touchAction: isExpanded ? 'auto' : 'none' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
        <StatusBar />
      </div>

      {/* Top Nav (feed mode) */}
      <TopNav visible={!isExpanded} />

      {/* Back Button (detail mode) */}
      <BackButton visible={isExpanded} onClick={onCollapse} />

      {/* Scrollable wrapper for detail mode */}
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-hidden"
        style={{
          overflowY: isExpanded ? 'auto' : 'hidden',
          scrollbarWidth: 'none',
        }}
      >
        {/* Reel stack — translates in feed mode, locked at current in detail mode */}
        <div
          className="will-change-transform"
          style={{
            transform: isExpanded
              ? 'translateY(0px)'
              : `translateY(${translateY}px)`,
            transition: isTransitioning || isExpanded
              ? TRANSITION
              : isDragging.current ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          {feedItems.map((item, index) => {
            const isCurrentCard = index === currentIndex
            const isThisExpanded = isExpanded && isCurrentCard

            return (
              <div
                key={item.id}
                className="w-full shrink-0"
                style={{
                  height: isThisExpanded ? 'auto' : CARD_HEIGHT,
                  minHeight: isThisExpanded ? CARD_HEIGHT : undefined,
                  display: isExpanded && !isCurrentCard ? 'none' : 'block',
                }}
              >
                {/* Game Card Area */}
                <div
                  className="relative bg-black overflow-hidden"
                  style={{
                    height: isThisExpanded ? 498 : 651,
                    transition: TRANSITION,
                  }}
                >
                  {/* The card itself — morphs between full and small */}
                  <div
                    className="absolute rounded-3xl overflow-hidden border border-white/10"
                    style={{
                      top: 54,
                      left: isThisExpanded ? 71.5 : 6,
                      right: isThisExpanded ? 71.5 : 6,
                      height: isThisExpanded ? 444 : 597,
                      transition: TRANSITION,
                    }}
                  >
                    {item.iframeUrl ? (
                      <iframe
                        src={item.iframeUrl}
                        title={item.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; gyroscope"
                      />
                    ) : (
                      <img
                        src={item.gameImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Floating remix avatars — fade out in detail */}
                  <div
                    className="absolute bottom-[16px] left-[23px] flex flex-col gap-2"
                    style={{
                      opacity: isThisExpanded ? 0 : (isCurrentCard && !isDragging.current ? 1 : 0),
                      transform: isThisExpanded ? 'translateY(16px)' : 'translateY(0)',
                      transition: TRANSITION,
                    }}
                  >
                    {item.remixAvatars.map((avatar, i) => (
                      <div key={i} className="relative w-9 h-9">
                        <div className="w-9 h-9 rounded-full overflow-hidden">
                          <img src={avatar.src} alt="" className="w-full h-full object-cover" />
                        </div>
                        {avatar.badge && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] bg-[#755be4] rounded-full flex items-center justify-center">
                            <img src={asset('/icon-remix-small.svg')} alt="" className="w-[10px] h-[10px]" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* UFI Row — always visible */}
                <div
                  style={{
                    opacity: isCurrentCard ? 1 : 0,
                    transition: TRANSITION,
                  }}
                >
                  <UFIRow
                    likes={item.likes}
                    comments={item.comments}
                    remixes={item.remixes}
                    onRemixClick={() => onExpand(item.id)}
                  />
                </div>

                {/* Post Info — morphs between compact (feed) and full (detail) */}
                <div
                  className="flex items-center gap-3 h-[52px] px-4 py-2"
                  style={{
                    opacity: isCurrentCard ? 1 : 0,
                    transition: TRANSITION,
                  }}
                >
                  <div className="relative w-9 h-9 shrink-0">
                    <div className="w-9 h-9 rounded-full overflow-hidden">
                      <img src={item.authorAvatar} alt={item.author} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] bg-white rounded-full border-2 border-black flex items-center justify-center">
                      <img src={asset('/icon-plus.svg')} alt="Follow" className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="text-white text-base font-bold leading-[22px]">{item.title}</span>
                    <span className="text-white text-sm leading-5">By {item.author}</span>
                  </div>

                  {/* Play button — visible only in feed mode */}
                  <button
                    onClick={() => onExpand(item.id)}
                    className="h-8 px-4 rounded-xl bg-white/15 text-[#f2f2f2] text-sm font-bold shrink-0"
                    style={{
                      opacity: isThisExpanded ? 0 : 1,
                      width: isThisExpanded ? 0 : 'auto',
                      padding: isThisExpanded ? 0 : undefined,
                      overflow: 'hidden',
                      transition: TRANSITION,
                    }}
                  >
                    Play
                  </button>

                  {/* Game thumb — visible only in feed mode */}
                  <button
                    onClick={() => onExpand(item.id)}
                    className="rounded-lg overflow-hidden border-2 border-white shrink-0"
                    style={{
                      width: isThisExpanded ? 0 : 28,
                      height: isThisExpanded ? 0 : 28,
                      opacity: isThisExpanded ? 0 : 1,
                      transition: TRANSITION,
                    }}
                  >
                    <img src={item.gameThumb} alt="" className="w-full h-full object-cover" />
                  </button>
                </div>

                {/* === Detail-only sections — slide up from below === */}
                <div
                  style={{
                    maxHeight: isThisExpanded ? 2000 : 0,
                    opacity: isThisExpanded ? 1 : 0,
                    overflow: 'hidden',
                    transition: TRANSITION,
                  }}
                >
                  {/* Remix / Play buttons */}
                  <div className="flex gap-3 px-4 pt-4 pb-3">
                    <button className="flex-1 h-11 rounded-full bg-[#f1f4f7] text-[#0a1317] text-[15px] font-medium">
                      Remix
                    </button>
                    <button className="flex-1 h-11 rounded-full bg-[#0a1317] text-[#f1f4f7] text-[15px] font-medium">
                      Play
                    </button>
                  </div>

                  {/* Remixes Header */}
                  <div className="flex flex-col gap-0.5 px-4 py-4 bg-black">
                    <span className="text-[#f2f2f2] text-base font-bold leading-[22px]">
                      {item.remixes} Remixes
                    </span>
                    <div className="flex items-center">
                      <div className="flex -space-x-1.5">
                        <div className="w-5 h-5 rounded-full overflow-hidden border border-black z-10">
                          <img src={asset('/avatar-ninja.jpg')} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-5 h-5 rounded-full overflow-hidden border border-black">
                          <img src={asset('/avatar-ninja.jpg')} alt="" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <span className="text-[#f2f2f2] text-[11px] leading-[13px] ml-1">
                        Remixed by <span className="font-bold">Derekheater</span> and <span className="font-bold">others</span>
                      </span>
                    </div>
                  </div>

                  {/* Media Grid */}
                  <MediaGrid />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-auto">
        <TabBar onTabClick={isExpanded ? onCollapse : undefined} />
      </div>
    </div>
  )
}
