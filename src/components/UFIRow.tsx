import { asset } from '../utils/asset'

interface UFIRowProps {
  likes?: string
  comments?: string
  remixes?: string
  onRemixClick?: () => void
}

export default function UFIRow({
  likes = '2M',
  comments = '65',
  remixes = '245',
  onRemixClick,
}: UFIRowProps) {
  return (
    <div className="flex items-center justify-between h-11 px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <img src={asset('/icon-heart.svg')} alt="Like" className="w-5 h-5" />
          <span className="text-sm font-semibold text-white/70">{likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src={asset('/icon-comment.svg')} alt="Comment" className="w-5 h-5" />
          <span className="text-sm font-semibold text-white/70">{comments}</span>
        </div>
        <button className="flex items-center gap-1" onClick={onRemixClick}>
          <img src={asset('/icon-remix.svg')} alt="Remix" className="w-5 h-5" />
          <span className="text-sm font-semibold text-white/70">{remixes}</span>
        </button>
      </div>
      <div className="flex items-center gap-4">
        <img src={asset('/icon-share.svg')} alt="Share" className="w-5 h-5" />
        <img src={asset('/icon-more.svg')} alt="More" className="w-5 h-5" />
      </div>
    </div>
  )
}
