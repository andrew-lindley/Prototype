import { asset } from '../utils/asset'

interface TabBarProps {
  onTabClick?: (tab: string) => void
  onHomeClick?: () => void
}

export default function TabBar({ onTabClick, onHomeClick }: TabBarProps) {
  const tabs = [
    { icon: asset('/icon-home.svg'), label: 'Home', active: true },
    { icon: asset('/icon-search.svg'), label: 'Search', active: false },
    { icon: asset('/icon-create.svg'), label: 'Create', active: false },
    { icon: asset('/icon-notifs.svg'), label: 'Notifs', active: false },
    { icon: asset('/icon-profile.svg'), label: 'Profile', active: false },
  ]

  return (
    <div className="flex items-center justify-center px-5 pt-5 pb-[25px]">
      <div className="flex items-center w-full h-[60px] bg-white/10 rounded-full p-1">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => {
              if (tab.label === 'Home' && onHomeClick) {
                onHomeClick()
              } else {
                onTabClick?.(tab.label)
              }
            }}
            className={`flex-1 flex items-center justify-center h-full rounded-full transition-colors ${
              tab.active ? 'bg-white/20' : ''
            }`}
          >
            <img src={tab.icon} alt={tab.label} className="w-6 h-6" />
          </button>
        ))}
      </div>
    </div>
  )
}
