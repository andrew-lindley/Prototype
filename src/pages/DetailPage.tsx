import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'
import UFIRow from '../components/UFIRow'

const gridImages = [
  { src: '/grid-1.jpg', hasAvatar: true },
  { src: '/grid-3.jpg', hasAvatar: true },
  { src: '/grid-4.jpg', hasAvatar: true },
  { src: '/grid-5.jpg', hasAvatar: false },
  { src: '/grid-6.jpg', hasAvatar: true },
  { src: '/grid-9.jpg', hasAvatar: true },
  { src: '/grid-7.jpg', hasAvatar: false },
  { src: '/grid-8.jpg', hasAvatar: false },
  { src: '/grid-10.jpg', hasAvatar: false },
  { src: '/grid-2.jpg', hasAvatar: false },
  { src: '/grid-11.jpg', hasAvatar: false },
  { src: '/grid-12.jpg', hasAvatar: false },
]

function GameCard() {
  return (
    <div className="flex justify-center px-[60px]">
      <div className="w-[250px] h-[444px] rounded-3xl overflow-hidden border border-white/10">
        <img
          src="/game-card.jpg"
          alt="Skate Run game preview"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

function PostInfo() {
  return (
    <div className="flex items-center gap-3 h-[52px] px-4 py-2">
      <div className="relative w-9 h-9 shrink-0">
        <div className="w-9 h-9 rounded-full overflow-hidden">
          <img src="/avatar-overlay.jpg" alt="MabelSyrup" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] bg-white rounded-full border-2 border-black flex items-center justify-center">
          <img src="/icon-plus.svg" alt="Follow" className="w-3 h-3" />
        </div>
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-white text-base font-bold leading-[22px]">Skate Run</span>
        <span className="text-white text-sm leading-5">By MabelSyrup</span>
      </div>
    </div>
  )
}

function ActionButtons() {
  return (
    <div className="flex gap-3 px-4 pt-4 pb-3">
      <button className="flex-1 h-11 rounded-full bg-[#f1f4f7] text-[#0a1317] text-[15px] font-medium">
        Remix
      </button>
      <button className="flex-1 h-11 rounded-full bg-[#0a1317] text-[#f1f4f7] text-[15px] font-medium">
        Play
      </button>
    </div>
  )
}

function RemixesHeader() {
  return (
    <div className="flex flex-col gap-0.5 px-4 py-4 bg-black">
      <span className="text-[#f2f2f2] text-base font-bold leading-[22px]">245 Remixes</span>
      <div className="flex items-center">
        <div className="flex -space-x-1.5">
          <div className="w-5 h-5 rounded-full overflow-hidden border border-black z-10">
            <img src="/avatar-ninja.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-5 h-5 rounded-full overflow-hidden border border-black">
            <img src="/avatar-ninja.jpg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <span className="text-[#f2f2f2] text-[11px] leading-[13px] ml-1">
          Remixed by <span className="font-bold">Derekheater</span> and <span className="font-bold">others</span>
        </span>
      </div>
    </div>
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
              <img
                src={item.src}
                alt=""
                className="w-full h-full object-cover"
              />
              {item.hasAvatar && (
                <div className="absolute bottom-[5px] left-[6px] w-[18px] h-[18px] rounded-full overflow-hidden">
                  <img src="/avatar-ninja.jpg" alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function DetailPage() {
  const navigate = useNavigate()

  return (
    <div className="w-[393px] min-h-screen bg-black text-white overflow-hidden rounded-[50px] relative">
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 overflow-y-auto pb-[110px]">
          <StatusBar />

          <div className="px-0 py-1">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center w-11 h-11"
            >
              <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
            </button>
          </div>

          <GameCard />
          <UFIRow onRemixClick={() => {}} />
          <PostInfo />
          <ActionButtons />
          <RemixesHeader />
          <MediaGrid />
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent">
          <TabBar onTabClick={() => navigate('/')} />
        </div>
      </div>
    </div>
  )
}
