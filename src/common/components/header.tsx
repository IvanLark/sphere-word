import { ArrowBack, HomeOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
	className?: string;
	leadingBtn?: JSX.Element;
	middleElement?: JSX.Element | string;
	trailingBtn?: JSX.Element;
}

export default function Header({ className, leadingBtn, middleElement, trailingBtn }: HeaderProps) {
	const navigate = useNavigate();
	return (
		<>
			<div className={`w-full h-14 fixed rounded-md border-2 border-black bg-white flex items-center overflow-hidden ${className}`}>
				{/* 左 */}
				{
					leadingBtn ? leadingBtn :
						<button title="Back" className="btn-trans size-16 rounded-md border-r-2 border-black group"
							onClick={() => {
								navigate(-1);
							}}>
							<div className="btn-scale-xl"><ArrowBack style={{ fontSize: "2.5rem" }} /></div>
						</button>
				}
				{/* 中 */}
				{
					middleElement instanceof Element ? middleElement :
						<div className="flex-1 text-center text-3xl font-bold">{middleElement}</div>
				}
				{/* 右 */}
				{
					trailingBtn ? trailingBtn :
						<button title="Menu" className="btn-trans size-16 rounded-md border-l-2 border-black group">
							<div className="btn-scale-xl" onClick={() => {
								navigate('/');
							}}>
								<HomeOutlined style={{ fontSize: "2.5rem" }} />
							</div>
						</button>
				}
			</div>
			<div className="w-full h-14"></div>
		</>
	);
}