import {Refresh} from "@mui/icons-material";

export default function ScreenLoading () {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] relative z-50">
      {/* //!这两个类名必须分开不然transform冲突 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Refresh className="anim-rotate" style={{fontSize: "10rem"}}/>
      </div>
    </div>
  );
}