import { asset } from '../utils/asset'

export default function StatusBar() {
  return (
    <div className="flex items-center justify-between px-8 pt-[18px] pb-[4px] h-[54px]">
      <span
        className="text-white text-[17px] font-semibold"
        style={{ fontFamily: '"SF Pro Text", system-ui, sans-serif' }}
      >
        9:41
      </span>
      <div className="w-[125px] h-[37px] bg-black rounded-full" />
      <img src={asset('/status-bar.svg')} alt="" className="h-[13px] w-[78px]" />
    </div>
  )
}
