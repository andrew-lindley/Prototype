import { useState, useCallback } from 'react'
import HomePage, { gridImages } from './pages/HomePage'
import type { FeedItem } from './pages/HomePage'
import { asset } from './utils/asset'

interface ImageMeta {
  title: string
  author: string
  authorAvatar: string
  likes: string
  comments: string
  remixes: string
}

const imageMetaMap: Record<string, ImageMeta> = {
  [asset('/grid-1.jpg')]:  { title: 'Picnic Park',    author: 'FloraBot',    authorAvatar: asset('/avatar-overlay.jpg'),    likes: '430K',  comments: '88',  remixes: '167' },
  [asset('/grid-2.jpg')]:  { title: 'Balloon Maze',   author: 'SkyDrifter',  authorAvatar: asset('/avatar-mabel.jpg'),      likes: '210K',  comments: '45',  remixes: '78' },
  [asset('/grid-3.jpg')]:  { title: 'Beach Cat',      author: 'PixelWizard', authorAvatar: asset('/avatar-ninja.jpg'),      likes: '850K',  comments: '120', remixes: '89' },
  [asset('/grid-4.jpg')]:  { title: 'Pixel Legend',    author: 'RetroKing',   authorAvatar: asset('/avatar-creator-1.jpg'),  likes: '1.5M',  comments: '290', remixes: '410' },
  [asset('/grid-5.jpg')]:  { title: 'Toy Town',       author: 'BlockBuilder', authorAvatar: asset('/avatar-mabel.jpg'),      likes: '620K',  comments: '150', remixes: '230' },
  [asset('/grid-6.jpg')]:  { title: 'Cloud Jumper',   author: 'AquaVerse',   authorAvatar: asset('/avatar-ninja.jpg'),      likes: '340K',  comments: '72',  remixes: '95' },
  [asset('/grid-7.jpg')]:  { title: 'Candy Crash',    author: 'SweetTooth',  authorAvatar: asset('/avatar-creator-1.jpg'),  likes: '1.2M',  comments: '340', remixes: '512' },
  [asset('/grid-8.jpg')]:  { title: 'Neon Forge',     author: 'SunsetCoder', authorAvatar: asset('/avatar-overlay.jpg'),    likes: '780K',  comments: '200', remixes: '310' },
  [asset('/grid-9.jpg')]:  { title: 'Ocean Deep',     author: 'AquaVerse',   authorAvatar: asset('/avatar-ninja.jpg'),      likes: '2.5M',  comments: '512', remixes: '1.2K' },
  [asset('/grid-10.jpg')]: { title: 'Night Hoops',    author: 'DarkDunk',    authorAvatar: asset('/avatar-creator-1.jpg'),  likes: '190K',  comments: '38',  remixes: '52' },
  [asset('/grid-11.jpg')]: { title: 'Dream Drift',    author: 'MabelSyrup',  authorAvatar: asset('/avatar-mabel.jpg'),      likes: '560K',  comments: '130', remixes: '185' },
  [asset('/grid-12.jpg')]: { title: 'Frost Frenzy',   author: 'IceBreaker',  authorAvatar: asset('/avatar-overlay.jpg'),    likes: '410K',  comments: '95',  remixes: '140' },
}

const fallbackMeta: ImageMeta = {
  title: 'Untitled',
  author: 'Unknown',
  authorAvatar: asset('/avatar-ninja.jpg'),
  likes: '0',
  comments: '0',
  remixes: '0',
}

function buildFeedFromImage(heroImage: string): FeedItem[] {
  const otherImages = gridImages
    .map((g) => g.src)
    .filter((src) => src !== heroImage)

  const remaining = otherImages.slice(0, 4)

  return [heroImage, ...remaining].map((img, i) => {
    const meta = imageMetaMap[img] || fallbackMeta
    return {
      id: `gen-${i}-${img}`,
      gameImage: img,
      title: meta.title,
      author: meta.author,
      authorAvatar: meta.authorAvatar,
      gameThumb: img,
      likes: meta.likes,
      comments: meta.comments,
      remixes: meta.remixes,
      remixAvatars: [
        { src: meta.authorAvatar, badge: true },
      ],
    }
  })
}

interface ViewLayer {
  id: string
  feed: FeedItem[] | null
  expandedId: string | null
  title?: string
  thumbnail?: string
}

export default function App() {
  const [stack, setStack] = useState<ViewLayer[]>([
    { id: 'root', feed: null, expandedId: null },
  ])

  const handleExpand = useCallback(
    (id: string) => {
      setStack((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = { ...updated[updated.length - 1], expandedId: id }
        return updated
      })
    },
    [],
  )

  const handleCollapse = useCallback(() => {
    setStack((prev) => {
      const top = prev[prev.length - 1]
      if (top.expandedId !== null) {
        const updated = [...prev]
        updated[updated.length - 1] = { ...top, expandedId: null }
        return updated
      }
      if (prev.length > 1) {
        return prev.slice(0, -1)
      }
      return prev
    })
  }, [])

  const handleGridImageTap = useCallback((imageSrc: string, contentTitle?: string, contentThumb?: string) => {
    const newFeed = buildFeedFromImage(imageSrc)
    const newLayer: ViewLayer = {
      id: `layer-${Date.now()}`,
      feed: newFeed,
      expandedId: null,
      title: contentTitle ? `${contentTitle} Remixes` : 'Remixes',
      thumbnail: contentThumb || imageSrc,
    }
    setStack((prev) => [...prev, newLayer])
  }, [])

  const handleGoHome = useCallback(() => {
    setStack([{ id: 'root', feed: null, expandedId: null }])
  }, [])

  return (
    <div className="flex justify-center">
      <div className="relative w-[393px] h-[852px]">
        {stack.map((layer, i) => {
          const isTop = i === stack.length - 1

          return (
            <div
              key={layer.id}
              className="absolute inset-0"
              style={{
                zIndex: i,
                display: isTop ? 'block' : 'none',
              }}
            >
              <HomePage
                expandedId={layer.expandedId}
                onExpand={handleExpand}
                onCollapse={handleCollapse}
                onGridImageTap={handleGridImageTap}
                customFeedItems={layer.feed ?? undefined}
                showBackAlways={i > 0}
                feedTitle={layer.title}
                feedThumbnail={layer.thumbnail}
                onHomeClick={handleGoHome}
                key={layer.id}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
