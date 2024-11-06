import {Menu, Send, StopCircle} from "@mui/icons-material";
import {ChatStatus} from "../types.ts";

interface SendButtonProps {
  chatStatus: ChatStatus;
  onClick: () => void;
}

export default function SendButton ({ chatStatus, onClick }: SendButtonProps) {

  const iconMap = {
    'empty': <Menu style={{fontSize: "2.5rem"}}/>,
    'inputting': <Send style={{fontSize: "2.5rem"}}/>,
    'generating': <StopCircle style={{fontSize: "2.5rem"}}/>
  };

  return (
    <button className="btn-scale-xl btn-common-hover size-12 rounded-md border-2 border-black"
            onClick={onClick}>
      {iconMap[chatStatus]}
    </button>
  );
}