import { useParams } from "react-router-dom";
import Topbar from "../components/Topbar";

const DetailPatient = () => {
    const { id } = useParams();

    return (
        <div className="md:flex-row">
        <Topbar />
        </div>
    );
};

export default DetailPatient;
